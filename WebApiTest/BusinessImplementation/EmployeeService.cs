using BusinessContracts;
using System;
using System.Collections.Generic;
using System.Text;
using DatabaseModel;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using DatabaseModel.Model;
using System.Linq;

namespace BusinessImplementation
{
    public class EmployeeService : IEmployeeService
    {
        EmployeeContext context = new EmployeeContext();
        public string AddEmployee(Employee employee)
        {
            try
            {
                //string query = $"INSERT INTO dbo.Employee VALUES ('{employee.EmployeeName}','{employee.Department}','{employee.DateOfJoining}','{employee.ProfileFileName}')";
                
                context.Employees.Add(employee);
                context.SaveChanges();
                return "pass";
            }
            catch (Exception E)
            {
                return "Error: " + E.ToString();
            }
        }

        public string DeleteEmployee(int Id)
        {
            try
            {
                Employee emp = new Employee();
                emp = context.Employees.Find(Id);
                context.Employees.Remove(emp);
                context.SaveChanges();
                return "pass";
            }
            catch (Exception E)
            {

                return "failed deletion" + E;
            }
        }

        public IEnumerable<Employee> GetAllEmployees()
        {

            IEnumerable<Employee> employees = context.Employees;

            return employees;
        }

        public IEnumerable<EmployeeType> GetAllTypes()
        {
            IEnumerable<EmployeeType> employeeTypes = context.EmployeeTypes;

            return employeeTypes;
        }

        public IEnumerable<EmployeeDelete> GetDeleteEmployees()
        {
            IEnumerable<EmployeeDelete> employees = context.DeletedEmp.FromSqlRaw<EmployeeDelete>("EXEC usp_GetDeletedEmployees ");

            int x = 0;
            return employees;
        }

        public IEnumerable<Department> GetDepartments()
        {
            IEnumerable<Department> depts = context.Departments.FromSqlRaw("SELECT DepartmentName FROM dbo.Department");
            return depts;
        }

        public IEnumerable<EmployeeDelete> RestoreEmployee(int Id)
        {
            //IQueryable<string> res = context.FromSqlRaw<string>("EXEC usp_RestoreEmployee {0}", Id);

            IEnumerable<EmployeeDelete> res = context.DeletedEmp.FromSqlRaw<EmployeeDelete>("EXEC usp_RestoreEmployee {0}", Id);

            return res;
        }

        public string UpdateEmployee(Employee employee)
        {
            try
            {
                context.Employees.Update(employee);
                context.SaveChanges();
                return "pass";
            }
            catch (Exception)
            {
                return "fail";
            }
        }
    }
}
