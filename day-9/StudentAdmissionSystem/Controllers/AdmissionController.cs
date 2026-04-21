using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAdmissionSystem.models;

namespace StudentAdmissionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {

        private static List<Admission> admissions = new List<Admission>();

        [HttpGet]
        public IActionResult Get() => Ok(admissions);

        [HttpPost]
        public IActionResult Add(Admission admission) => Ok(admission);


        
    }
}