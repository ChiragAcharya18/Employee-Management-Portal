using DatabaseModel.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessContracts
{
     public interface IPrintEmployee
    {
        public object GetPrintEmployeeTable();

        public object GetPrintDetails(int Id);

        public string AddPrintDetails(PrintDetail printDetail);

        public string UpdatePrintDetails(PrintDetail printDetail);
    }
}
