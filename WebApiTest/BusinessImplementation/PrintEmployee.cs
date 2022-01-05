using BusinessContracts;
using DatabaseModel.Model;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BusinessImplementation
{
    public class PrintEmployee : IPrintEmployee
    {
        EmployeeContext employeeContext = new EmployeeContext();

        public string AddPrintDetails(PrintDetail printDetail)
        {
            try
            {
                employeeContext.PrintDetails.Add(printDetail);
                employeeContext.SaveChanges();
                return "pass";
            }
            catch (Exception E)
            {
                return E.ToString();
            }
        }

        public object GetPrintDetails(int Id)
        {
            var printDetails = employeeContext.PrintSp.FromSqlRaw<EmployeePrint>(" EXECUTE [usp_GetPrintDetails] {0}", Id).ToList().FirstOrDefault();

            return printDetails;
        }

        public object GetPrintEmployeeTable()
        {
            IEnumerable<PrintDetail> printDetail = employeeContext.PrintDetails;
            return printDetail;
        }

        public string UpdatePrintDetails(PrintDetail printDetail)
        {
            try
            {
                employeeContext.PrintDetails.Update(printDetail);
                employeeContext.SaveChanges();
                return "pass";
            }
            catch (Exception)
            {
                return "fail";
            }
        }
    }
}
