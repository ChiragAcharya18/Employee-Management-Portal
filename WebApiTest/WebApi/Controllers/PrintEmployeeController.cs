using BusinessContracts;
using DatabaseModel.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/print")]
    [ApiController]
    public class PrintEmployeeController : Controller
    {
        IPrintEmployee printEmployee;
        public PrintEmployeeController(IPrintEmployee _printEmployee)
        {
            printEmployee = _printEmployee;
        }

        [HttpGet("{Id}")]
        public JsonResult Get(int Id)
        {
            object printDetails = printEmployee.GetPrintDetails(Id);
            return new JsonResult(printDetails);
        }

        [HttpPost]
        public JsonResult Post([FromBody] PrintDetail printDetail)
        {
            string res = printEmployee.AddPrintDetails(printDetail);
            if (res == "pass")
            {
                return new JsonResult("Print details Added Successfully!");
            }
            else
            {
                return new JsonResult("Can't add employee print details\n");
            }
        }

        [HttpPut]
        public JsonResult Put([FromBody] PrintDetail printDetail)
        {
            string res = printEmployee.UpdatePrintDetails(printDetail);
            if (res == "pass")
            {
                return new JsonResult("Employee print details updated Successfully!");
            }
            else
            {
                return new JsonResult("Can't update employee print details\n");
            }
        }

        [Route("GetPrintTable")]
        [HttpGet]
        public JsonResult GetPrintTable()
        {
            object printDetails = printEmployee.GetPrintEmployeeTable();
            return new JsonResult(printDetails);
        }
    }
}
