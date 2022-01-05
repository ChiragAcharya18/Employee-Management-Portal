using System;
using System.Collections.Generic;

#nullable disable

namespace DatabaseModel.Model
{
    public partial class Employee
    {
        public Employee()
        {
            PrintDetails = new HashSet<PrintDetail>();
        }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string ProfileFileName { get; set; }
        public virtual ICollection<PrintDetail> PrintDetails { get; set; }
    }
}
