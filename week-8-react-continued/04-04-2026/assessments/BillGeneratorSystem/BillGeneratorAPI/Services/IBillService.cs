using BillGeneratorAPI.DTOs;

namespace BillGeneratorAPI.Services
{
    public interface IBillService
    {
        // Bill Operations
        Task<BillDto> CreateBillAsync(CreateBillDto createBillDto);
        Task<BillDto?> GetBillByIdAsync(int id);
        Task<BillDto?> GetBillByInvoiceNumberAsync(string invoiceNumber);
        Task<(List<BillDto> Bills, int TotalCount)> GetAllBillsAsync(BillFilterDto filter);
        Task<bool> DeleteBillAsync(int id);

        // Bill Item Operations
        Task<BillDto> AddItemToBillAsync(int billId, AddBillItemDto addItemDto);
        Task<BillDto> RemoveItemFromBillAsync(int billId, int billItemId);
        Task<BillDto> UpdateItemQuantityAsync(int billId, int billItemId, UpdateBillItemQuantityDto updateDto);

        // Discount Operations
        Task<BillDto> ApplyDiscountAsync(int billId, ApplyDiscountDto discountDto);

        // Bill Finalization
        Task<BillDto> FinalizeBillAsync(int billId);
        Task<BillDto> UpdateBillNotesAsync(int billId, UpdateBillNotesDto notesDto);

        // Summary Operations
        Task<object> GetDailySummaryAsync(DateTime date);
    }
}
