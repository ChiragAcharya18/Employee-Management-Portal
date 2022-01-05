using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BusinessContracts;
using DatabaseModel;
using DatabaseModel.Model;

namespace BusinessImplementation
{
    public class DepartmentService : IDepartmentService
    {
        EmployeeContext context = new EmployeeContext();

        public string AddDepartment(Department department)
        {

            try
            {
                 context.Departments.Add(department);
                context.SaveChanges();
                return "pass";
            }
            catch (Exception E)
            {
                return "Error: " + E.ToString();
            }
        }

        public string DeleteDepartment(int Id)
        {
            try
            {
                Department emp = new Department();
                emp = context.Departments.Find(Id);
                context.Departments.Remove(emp);
                context.SaveChanges();
                return "pass";
            }
            catch (Exception)
            {
                return "failed deletion";
            }
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            IEnumerable<Department> dept = context.Departments;
            return dept;
        }

        public int GetDepIdByName(string Name)
        {
            int Id;
            var department = context.Departments.FirstOrDefault(u => u.DepartmentName == Name);
            Id = department.DepartmentId;
            return Id;
        }

        public string UpdateDepartment(Department department)
        {
            try
            {
                context.Departments.Update(department);
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
