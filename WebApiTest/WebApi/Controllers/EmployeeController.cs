using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessImplementation;
using DatabaseModel;
using System.Text.Json;
using BusinessContracts;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using DatabaseModel.Model;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        IEmployeeService employeeService;
        private readonly IWebHostEnvironment _env;
        ICustomLogin customLogin;
        public EmployeeController(IEmployeeService _employeeService, IWebHostEnvironment env, ICustomLogin _customLogin)
        {
            employeeService = _employeeService;
            customLogin = _customLogin;
            _env = env;
        }
        
        [HttpGet]
        public JsonResult Get()
        {
            var emp = employeeService.GetAllEmployees();
            return new JsonResult(emp);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Employee employee)
        {
            string res = employeeService.AddEmployee(employee);
            if (res == "pass")
            {
                return new JsonResult("Employee Added Successfully!");
            }
            else
            {
                return new JsonResult("Can't add employee\n" + res);
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {

            string res = employeeService.DeleteEmployee(id);
            if (res == "pass")
            {
                return new JsonResult("Employee Deleted Successfully!");
            }
            else
            {
                return new JsonResult("Can't delete employee\n");
            }
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {

            string res = employeeService.UpdateEmployee(emp);
            if (res == "pass")
            {
                return new JsonResult("Employee Updated Successfully!");
            }
            else
            {
                return new JsonResult("Can't Updated Employee\n");
            }
        }

        [Route("GetAllDepartmentNames")]
        [HttpGet]
        public JsonResult GetAllDepartmentNames()
        {
            DepartmentService departmentService = new DepartmentService();
            IEnumerable<Department> depts = departmentService.GetAllDepartments();
            return new JsonResult(depts);
        }

        [Route("GetAllEmployeeTypes")]
        [HttpGet]
        public JsonResult GetAllEmployeeTypes()
        {
            return new JsonResult(employeeService.GetAllTypes());
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.PNG");
            }
        }

        [HttpGet] 
        [Route("GetDeletedEmployees")]
        public JsonResult GetDeletedEmployees()
        {
            IEnumerable<EmployeeDelete> employees = employeeService.GetDeleteEmployees();

            return new JsonResult(employees);
        }

        [HttpGet("{Id}")]
        //[Route("Restore")]
        public JsonResult RestoreEmployee(int Id)
        {
            IEnumerable<EmployeeDelete> res = employeeService.RestoreEmployee(Id);

            return new JsonResult(res);
        }

        [HttpPost]
        [Route("login")]
        public JsonResult LoginUser([FromBody] UserLogin userLogin)
        {
            AuthResponse authResponse = customLogin.CheckLogin(userLogin);
            return new JsonResult(authResponse);
        }

        [HttpPost]
        [Route("verify-token")]
        public JsonResult AuthToken([FromBody] UserLogin userLogin)
        {
            AuthResponse authResponse = customLogin.AuthToken(userLogin);
            return new JsonResult(authResponse);
        }

        [HttpPost]
        [Route("register-user")]
        public JsonResult RegisterUser([FromBody] UserLogin userLogin)
        {
            AuthResponse authResponse = customLogin.RegisterUser(userLogin);
            return new JsonResult(authResponse);
        }
    }
}
