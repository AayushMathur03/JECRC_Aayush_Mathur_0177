using EMSAPI.Data;
using EMSAPI.Models;

namespace EMSAPI.Repository
{
    public class EmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Employee> GetAll()
        {
            return _context.Employees.ToList();
        }

        public void Add(Employee emp)
        {
            _context.Employees.Add(emp);
            _context.SaveChanges();
        }
    }
}
