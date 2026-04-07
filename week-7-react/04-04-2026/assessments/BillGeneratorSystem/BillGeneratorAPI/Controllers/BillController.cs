using Microsoft.AspNetCore.Mvc;
using BillGeneratorAPI.DTOs;
using BillGeneratorAPI.Services;

namespace BillGeneratorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;

        public BillController(IBillService billService)
        {
            _billService = billService;
        }

        // ========================================
        // BILL OPERATIONS
        // ========================================

        /// <summary>
        /// Create a new bill
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<BillDto>> CreateBill([FromBody] CreateBillDto createBillDto)
        {
            try
            {
                var bill = await _billService.CreateBillAsync(createBillDto);
                return CreatedAtAction(nameof(GetBillById), new { id = bill.Id }, bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get bill by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<BillDto>> GetBillById(int id)
        {
            try
            {
                var bill = await _billService.GetBillByIdAsync(id);
                if (bill == null)
                    return NotFound(new { message = $"Bill with ID {id} not found" });

                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get bill by invoice number
        /// </summary>
        [HttpGet("invoice/{invoiceNumber}")]
        public async Task<ActionResult<BillDto>> GetBillByInvoiceNumber(string invoiceNumber)
        {
            try
            {
                var bill = await _billService.GetBillByInvoiceNumberAsync(invoiceNumber);
                if (bill == null)
                    return NotFound(new { message = $"Bill with invoice number {invoiceNumber} not found" });

                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get all bills with optional filtering
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<object>> GetAllBills([FromQuery] BillFilterDto filter)
        {
            try
            {
                var (bills, totalCount) = await _billService.GetAllBillsAsync(filter);
                
                return Ok(new
                {
                    data = bills,
                    totalCount = totalCount,
                    pageNumber = filter.PageNumber,
                    pageSize = filter.PageSize,
                    totalPages = (int)Math.Ceiling(totalCount / (double)filter.PageSize)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Delete a bill
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBill(int id)
        {
            try
            {
                var result = await _billService.DeleteBillAsync(id);
                if (!result)
                    return NotFound(new { message = $"Bill with ID {id} not found" });

                return Ok(new { message = "Bill deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ========================================
        // BILL ITEM OPERATIONS
        // ========================================

        /// <summary>
        /// Add item to bill
        /// </summary>
        [HttpPost("{billId}/items")]
        public async Task<ActionResult<BillDto>> AddItemToBill(int billId, [FromBody] AddBillItemDto addItemDto)
        {
            try
            {
                var bill = await _billService.AddItemToBillAsync(billId, addItemDto);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Remove item from bill
        /// </summary>
        [HttpDelete("{billId}/items/{billItemId}")]
        public async Task<ActionResult<BillDto>> RemoveItemFromBill(int billId, int billItemId)
        {
            try
            {
                var bill = await _billService.RemoveItemFromBillAsync(billId, billItemId);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update item quantity in bill
        /// </summary>
        [HttpPatch("{billId}/items/{billItemId}/quantity")]
        public async Task<ActionResult<BillDto>> UpdateItemQuantity(
            int billId, 
            int billItemId, 
            [FromBody] UpdateBillItemQuantityDto updateDto)
        {
            try
            {
                var bill = await _billService.UpdateItemQuantityAsync(billId, billItemId, updateDto);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ========================================
        // DISCOUNT OPERATIONS
        // ========================================

        /// <summary>
        /// Apply discount to bill (percentage or fixed amount)
        /// </summary>
        [HttpPatch("{billId}/discount")]
        public async Task<ActionResult<BillDto>> ApplyDiscount(int billId, [FromBody] ApplyDiscountDto discountDto)
        {
            try
            {
                var bill = await _billService.ApplyDiscountAsync(billId, discountDto);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ========================================
        // BILL FINALIZATION
        // ========================================

        /// <summary>
        /// Finalize bill (convert from draft to final)
        /// </summary>
        [HttpPatch("{billId}/finalize")]
        public async Task<ActionResult<BillDto>> FinalizeBill(int billId)
        {
            try
            {
                var bill = await _billService.FinalizeBillAsync(billId);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update bill notes
        /// </summary>
        [HttpPatch("{billId}/notes")]
        public async Task<ActionResult<BillDto>> UpdateBillNotes(int billId, [FromBody] UpdateBillNotesDto notesDto)
        {
            try
            {
                var bill = await _billService.UpdateBillNotesAsync(billId, notesDto);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ========================================
        // SUMMARY OPERATIONS
        // ========================================

        /// <summary>
        /// Get daily sales summary
        /// </summary>
        [HttpGet("summary/daily")]
        public async Task<ActionResult<object>> GetDailySummary([FromQuery] DateTime? date)
        {
            try
            {
                var summaryDate = date ?? DateTime.Now;
                var summary = await _billService.GetDailySummaryAsync(summaryDate);
                return Ok(summary);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
