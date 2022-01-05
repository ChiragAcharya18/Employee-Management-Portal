using DatabaseModel;
using DatabaseModel.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessContracts
{
    public interface IDepartmentService
    {
        public IEnumerable<Department> GetAllDepartments();

        public string AddDepartment(Department department);

        public string UpdateDepartment(Department department);

        public string DeleteDepartment(int Id);

        public int GetDepIdByName(string Name);
    }
}
