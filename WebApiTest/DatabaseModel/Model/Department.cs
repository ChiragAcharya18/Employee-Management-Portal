using System;
using System.Collections.Generic;

#nullable disable
// Scaffold-DbContext "Server=LAP00282\SQLEXPRESS17;Database=EmployeeDatabase;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir D:\AngularProjects\ASP.NET\WebApiTest\DatabaseModel\Model -Force
namespace DatabaseModel.Model
{
    public partial class Department
    {
        public Department()
        {
            PrintDetails = new HashSet<PrintDetail>();
        }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public virtual ICollection<PrintDetail> PrintDetails { get; set; }
    }
}
