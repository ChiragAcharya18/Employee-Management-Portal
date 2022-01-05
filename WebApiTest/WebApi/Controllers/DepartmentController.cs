using BusinessContracts;
using DatabaseModel;
using DatabaseModel.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        IDepartmentService departmentService;
        public DepartmentController(IDepartmentService _departmentService)
        {
            departmentService = _departmentService;
        }

        [HttpGet]
        public JsonResult Get()
        {

            var dept = departmentService.GetAllDepartments();
            return new JsonResult(dept);
        }

        [HttpPost]
        public JsonResult Post(Department dep)
        {


            string res = departmentService.AddDepartment(dep);
            if (res == "pass")
            {
                return new JsonResult("Department Added Successfully!");
            }
            else
            {
                return new JsonResult("Can't add Department\n");
            }
        }

        [HttpPut]
        public JsonResult Put(Department dep)
        {
            string res = departmentService.UpdateDepartment(dep);
            if (res == "pass")
            {
                return new JsonResult("Department Updated Successfully!");
            }
            else
            {
                return new JsonResult("Can't Updated Department\n");
            }
            //return new JsonResult("Updated Successfully!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string res = departmentService.DeleteDepartment(id);
            if (res == "pass")
            {
                return new JsonResult("Department Deleted Successfully!");
            }
            else
            {
                return new JsonResult("Can't Delete Department\n");
            }
        }

        [HttpGet("{name}")]
        public JsonResult GetDepId(string name)
        {
            int Id = departmentService.GetDepIdByName(name);
            return new JsonResult(Id);
        }
    }
}
