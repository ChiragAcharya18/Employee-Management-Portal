using System.Collections.Generic;
using DatabaseModel;
using DatabaseModel.Model;

namespace BusinessContracts
{
    public interface IEmployeeService
    {
        public IEnumerable<Employee> GetAllEmployees();

        public string AddEmployee(Employee employee);

        public IEnumerable<EmployeeType> GetAllTypes();

        public string DeleteEmployee(int Id);

        public string UpdateEmployee(Employee employee);

        public IEnumerable<Department> GetDepartments();

        public IEnumerable<EmployeeDelete> GetDeleteEmployees();

        public IEnumerable<EmployeeDelete> RestoreEmployee(int Id);
        
    }
}
