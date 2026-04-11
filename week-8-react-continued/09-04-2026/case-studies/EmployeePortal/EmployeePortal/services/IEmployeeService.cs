using EmployeePortal.models.dto;

namespace EmployeePortal.services
{
    public interface IEmployeeService
    {
         EmployeeResponseDto CreateEmployee(CreateEmployeeDto createEmployeeDto);

        EmployeeResponseDto GetById(Guid id);

        List<EmployeeResponseDto> GetAllEmployees();
    }
}