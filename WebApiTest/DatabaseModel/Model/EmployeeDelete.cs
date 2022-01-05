using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DatabaseModel.Model
{
    public class EmployeeDelete
    {
        [Key]
        public int EmployeeId { get; set; }

        public string EmployeeName { get; set; }

    }
}
