using System.ComponentModel.DataAnnotations;

namespace BillGeneratorAPI.DTOs
{
    public class UpdateBillNotesDto
    {
        [MaxLength(500)]
        public string? Notes { get; set; }
    }
}
