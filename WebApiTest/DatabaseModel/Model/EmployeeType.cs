using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace DatabaseModel.Model
{
    public partial class EmployeeType
    {
        public EmployeeType()
        {
            PrintDetails = new HashSet<PrintDetail>();
        }
        [Key]
        public int EmployeeTypeId { get; set; }
        public string EmployeeType1 { get; set; }

        public virtual ICollection<PrintDetail> PrintDetails { get; set; }
    }
}
