using Microsoft.EntityFrameworkCore;
using BillGeneratorAPI.Data;
using BillGeneratorAPI.Models;
using BillGeneratorAPI.DTOs;

namespace BillGeneratorAPI.Services
{
    public class BillService : IBillService
    {
        private readonly ApplicationDbContext _context;

        public BillService(ApplicationDbContext context)
        {
            _context = context;
        }

        // ========================================
        // BILL OPERATIONS
        // ========================================

        public async Task<BillDto> CreateBillAsync(CreateBillDto createBillDto)
        {
            var invoiceNumber = await GenerateUniqueInvoiceNumberAsync();

            var bill = new Bill
            {
                InvoiceNumber = invoiceNumber,
                BillDate = DateTime.Now,
                Notes = createBillDto.Notes,
                IsDraft = createBillDto.IsDraft,
                TaxPercentage = createBillDto.TaxPercentage,
                SubTotal = 0,
                DiscountAmount = 0,
                DiscountPercentage = 0,
                TaxAmount = 0,
                TotalAmount = 0,
                CreatedDate = DateTime.Now
            };

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return MapBillToDto(bill);
        }

        public async Task<BillDto?> GetBillByIdAsync(int id)
        {
            var bill = await _context.Bills
                .Include(b => b.BillItems)
                .ThenInclude(bi => bi.CatalogItem)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bill == null)
                return null;

            return MapBillToDto(bill);
        }

        public async Task<BillDto?> GetBillByInvoiceNumberAsync(string invoiceNumber)
        {
            var bill = await _context.Bills
                .Include(b => b.BillItems)
                .ThenInclude(bi => bi.CatalogItem)
                .FirstOrDefaultAsync(b => b.InvoiceNumber == invoiceNumber);

            if (bill == null)
                return null;

            return MapBillToDto(bill);
        }

        public async Task<(List<BillDto> Bills, int TotalCount)> GetAllBillsAsync(BillFilterDto filter)
        {
            var query = _context.Bills
                .Include(b => b.BillItems)
                .ThenInclude(bi => bi.CatalogItem)
                .AsQueryable();

            // Apply filters
            if (filter.StartDate.HasValue)
            {
                query = query.Where(b => b.BillDate >= filter.StartDate.Value);
            }

            if (filter.EndDate.HasValue)
            {
                var endDate = filter.EndDate.Value.Date.AddDays(1).AddSeconds(-1);
                query = query.Where(b => b.BillDate <= endDate);
            }

            if (filter.IsDraft.HasValue)
            {
                query = query.Where(b => b.IsDraft == filter.IsDraft.Value);
            }

            if (!string.IsNullOrWhiteSpace(filter.InvoiceNumber))
            {
                query = query.Where(b => b.InvoiceNumber.Contains(filter.InvoiceNumber));
            }

            if (filter.MinAmount.HasValue)
            {
                query = query.Where(b => b.TotalAmount >= filter.MinAmount.Value);
            }

            if (filter.MaxAmount.HasValue)
            {
                query = query.Where(b => b.TotalAmount <= filter.MaxAmount.Value);
            }

            // Get total count before pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var bills = await query
                .OrderByDescending(b => b.BillDate)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            var billDtos = bills.Select(MapBillToDto).ToList();

            return (billDtos, totalCount);
        }

        public async Task<bool> DeleteBillAsync(int id)
        {
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null)
                return false;

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();
            return true;
        }

        // ========================================
        // BILL ITEM OPERATIONS
        // ========================================

        public async Task<BillDto> AddItemToBillAsync(int billId, AddBillItemDto addItemDto)
        {
            var bill = await _context.Bills
                .Include(b => b.BillItems)
                .FirstOrDefaultAsync(b => b.Id == billId);

            if (bill == null)
                throw new Exception($"Bill with ID {billId} not found");

            var billItem = new BillItem
            {
                BillId = billId,
                CatalogItemId = addItemDto.CatalogItemId,
                ItemName = addItemDto.ItemName,
                Description = addItemDto.Description,
                Quantity = addItemDto.Quantity,
                UnitPrice = addItemDto.UnitPrice,
                TotalPrice = addItemDto.Quantity * addItemDto.UnitPrice,
                ItemType = addItemDto.ItemType
            };

            _context.BillItems.Add(billItem);
            bill.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            // Recalculate totals
            await RecalculateBillTotalsAsync(billId);

            return await GetBillByIdAsync(billId) ?? throw new Exception("Failed to retrieve updated bill");
        }

        public async Task<BillDto> RemoveItemFromBillAsync(int billId, int billItemId)
        {
            var bill = await _context.Bills
                .Include(b => b.BillItems)
                .FirstOrDefaultAsync(b => b.Id == billId);

            if (bill == null)
                throw new Exception($"Bill with ID {billId} not found");

            var billItem = bill.BillItems.FirstOrDefault(bi => bi.Id == billItemId);
            if (billItem == null)
                throw new Exception($"Bill item with ID {billItemId} not found in bill {billId}");

            _context.BillItems.Remove(billItem);
            bill.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            // Recalculate totals
            await RecalculateBillTotalsAsync(billId);

            return await GetBillByIdAsync(billId) ?? throw new Exception("Failed to retrieve updated bill");
        }

        public async Task<BillDto> UpdateItemQuantityAsync(int billId, int billItemId, UpdateBillItemQuantityDto updateDto)
        {
            var bill = await _context.Bills
                .Include(b => b.BillItems)
                .FirstOrDefaultAsync(b => b.Id == billId);

            if (bill == null)
                throw new Exception($"Bill with ID {billId} not found");

            var billItem = bill.BillItems.FirstOrDefault(bi => bi.Id == billItemId);
            if (billItem == null)
                throw new Exception($"Bill item with ID {billItemId} not found in bill {billId}");

            billItem.Quantity = updateDto.Quantity;
            billItem.TotalPrice = billItem.Quantity * billItem.UnitPrice;
            bill.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            // Recalculate totals
            await RecalculateBillTotalsAsync(billId);

            return await GetBillByIdAsync(billId) ?? throw new Exception("Failed to retrieve updated bill");
        }

        // ========================================
        // DISCOUNT OPERATIONS
        // ========================================

        public async Task<BillDto> ApplyDiscountAsync(int billId, ApplyDiscountDto discountDto)
        {
            var bill = await _context.Bills.FindAsync(billId);
            if (bill == null)
                throw new Exception($"Bill with ID {billId} not found");

            bill.DiscountPercentage = discountDto.DiscountPercentage;
            bill.DiscountAmount = discountDto.DiscountAmount;
            bill.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            // Recalculate totals
            await RecalculateBillTotalsAsync(billId);

            return await GetBillByIdAsync(billId) ?? throw new Exception("Failed to retrieve updated bill");
        }

        // ========================================
        // BILL FINALIZATION
        // ========================================

        public async Task<BillDto> FinalizeBillAsync(int billId)
        {
            var bill = await _context.Bills.FindAsync(billId);
            if (bill == null)
                throw new Exception($"Bill with ID {billId} not found");

            bill.IsDraft = false;
            bill.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return await GetBillByIdAsync(billId) ?? throw new Exception("Failed to retrieve updated bill");
        }

        public async Task<BillDto> UpdateBillNotesAsync(int billId, UpdateBillNotesDto notesDto)
        {
            var bill = await _context.Bills.FindAsync(billId);
            if (bill == null)
                throw new Exception($"Bill with ID {billId} not found");

            bill.Notes = notesDto.Notes;
            bill.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return await GetBillByIdAsync(billId) ?? throw new Exception("Failed to retrieve updated bill");
        }

        // ========================================
        // SUMMARY OPERATIONS
        // ========================================

        public async Task<object> GetDailySummaryAsync(DateTime date)
        {
            var startOfDay = date.Date;
            var endOfDay = date.Date.AddDays(1).AddSeconds(-1);

            var bills = await _context.Bills
                .Where(b => b.BillDate >= startOfDay && b.BillDate <= endOfDay && !b.IsDraft)
                .Include(b => b.BillItems)
                .ToListAsync();

            var totalSales = bills.Sum(b => b.TotalAmount);
            var totalBills = bills.Count;
            var totalItems = bills.Sum(b => b.BillItems.Count);
            var totalDiscount = bills.Sum(b => b.DiscountAmount);
            var totalTax = bills.Sum(b => b.TaxAmount);

            // Group by item type
            var itemTypeBreakdown = await _context.BillItems
                .Where(bi => bi.Bill.BillDate >= startOfDay && bi.Bill.BillDate <= endOfDay && !bi.Bill.IsDraft)
                .GroupBy(bi => bi.ItemType)
                .Select(g => new
                {
                    ItemType = g.Key,
                    TotalQuantity = g.Sum(bi => bi.Quantity),
                    TotalAmount = g.Sum(bi => bi.TotalPrice)
                })
                .ToListAsync();

            return new
            {
                Date = date.ToString("yyyy-MM-dd"),
                TotalSales = totalSales,
                TotalBills = totalBills,
                TotalItems = totalItems,
                TotalDiscount = totalDiscount,
                TotalTax = totalTax,
                NetSales = totalSales - totalDiscount,
                ItemTypeBreakdown = itemTypeBreakdown
            };
        }

        // ========================================
        // PRIVATE HELPER METHODS
        // ========================================

        private async Task<string> GenerateUniqueInvoiceNumberAsync()
        {
            var today = DateTime.Now;
            var prefix = $"INV-{today:yyyyMMdd}";

            var lastBill = await _context.Bills
                .Where(b => b.InvoiceNumber.StartsWith(prefix))
                .OrderByDescending(b => b.InvoiceNumber)
                .FirstOrDefaultAsync();

            int sequence = 1;

            if (lastBill != null)
            {
                var lastSequence = lastBill.InvoiceNumber.Substring(prefix.Length + 1);
                if (int.TryParse(lastSequence, out int parsedSequence))
                {
                    sequence = parsedSequence + 1;
                }
            }

            return $"{prefix}-{sequence:D4}";
        }

        private async Task RecalculateBillTotalsAsync(int billId)
        {
            var bill = await _context.Bills
                .Include(b => b.BillItems)
                .FirstOrDefaultAsync(b => b.Id == billId);

            if (bill == null)
                return;

            // Calculate subtotal
            bill.SubTotal = bill.BillItems.Sum(bi => bi.TotalPrice);

            // Calculate discount amount
            decimal discountFromPercentage = (bill.SubTotal * bill.DiscountPercentage) / 100;
            decimal totalDiscount = discountFromPercentage + bill.DiscountAmount;

            // Subtotal after discount
            decimal subtotalAfterDiscount = bill.SubTotal - totalDiscount;
            if (subtotalAfterDiscount < 0)
                subtotalAfterDiscount = 0;

            // Calculate tax
            bill.TaxAmount = (subtotalAfterDiscount * bill.TaxPercentage) / 100;

            // Calculate total
            bill.TotalAmount = subtotalAfterDiscount + bill.TaxAmount;

            // Update the discount amount to reflect both percentage and fixed discount
            bill.DiscountAmount = totalDiscount;

            await _context.SaveChangesAsync();
        }

        private BillDto MapBillToDto(Bill bill)
        {
            return new BillDto
            {
                Id = bill.Id,
                InvoiceNumber = bill.InvoiceNumber,
                BillDate = bill.BillDate,
                SubTotal = bill.SubTotal,
                DiscountAmount = bill.DiscountAmount,
                DiscountPercentage = bill.DiscountPercentage,
                TaxAmount = bill.TaxAmount,
                TaxPercentage = bill.TaxPercentage,
                TotalAmount = bill.TotalAmount,
                Notes = bill.Notes,
                IsDraft = bill.IsDraft,
                CreatedDate = bill.CreatedDate,
                UpdatedDate = bill.UpdatedDate,
                BillItems = bill.BillItems?.Select(bi => new BillItemDto
                {
                    Id = bi.Id,
                    BillId = bi.BillId,
                    CatalogItemId = bi.CatalogItemId,
                    ItemName = bi.ItemName,
                    Description = bi.Description,
                    Quantity = bi.Quantity,
                    UnitPrice = bi.UnitPrice,
                    TotalPrice = bi.TotalPrice,
                    ItemType = bi.ItemType
                }).ToList() ?? new List<BillItemDto>()
            };
        }
    }
}
