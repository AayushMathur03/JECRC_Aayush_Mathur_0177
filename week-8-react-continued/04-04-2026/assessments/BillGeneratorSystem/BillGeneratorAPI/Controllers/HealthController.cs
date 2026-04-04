using Microsoft.AspNetCore.Mvc;

namespace BillGeneratorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                status = "Healthy",
                message = "Bill Generator API is running successfully!",
                timestamp = DateTime.Now
            });
        }
    }
}