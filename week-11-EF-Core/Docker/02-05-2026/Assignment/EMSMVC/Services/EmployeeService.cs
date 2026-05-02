using EMSMVC.Models;
using Newtonsoft.Json;
using System.Text;

public class EmployeeService
{
    private readonly HttpClient _client;

    public EmployeeService(HttpClient client)
    {
        _client = client;
    }

    public async Task<List<Employee>> GetEmployees()
    {
        var response = await _client.GetAsync("api/employee");
        var data = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<List<Employee>>(data);
    }

    public async Task AddEmployee(Employee emp)
    {
        var json = JsonConvert.SerializeObject(emp);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        await _client.PostAsync("api/employee", content);
    }
}