using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace DatabaseModel.Model
{
    public partial class PrintDetail
    {
        [Key]
        public int PrintId { get; set; }
        public int EmployeeId { get; set; }
        public int DepartmentId { get; set; }
        public string Email { get; set; }
        public DateTime Dob { get; set; }
        public long Salary { get; set; }
        public string PfNumber { get; set; }
        public string Assets { get; set; }
        public string Address { get; set; }
        public string JobTitle { get; set; }
        public int EmployeeTypeId { get; set; }
        public string BloodGroup { get; set; }
        public string MaritalStatus { get; set; }
        public string PhoneNumber { get; set; }

        public virtual Department Department { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual EmployeeType EmployeeType { get; set; }
    }
}
