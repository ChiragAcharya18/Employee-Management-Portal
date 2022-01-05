using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DatabaseModel.Model
{
    public class EmployeePrint
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
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string ProfileFileName { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeType { get; set; }

    }
}
