using BusinessContracts;
using DatabaseModel.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BusinessImplementation
{
    public class CustomLogin : ICustomLogin
    {
        EmployeeContext context = new EmployeeContext();

        public AuthResponse AuthToken(UserLogin userLogin)
        {
            var authResponse = context.AuthUserSp.FromSqlRaw<AuthResponse>("EXEC [usp_TokenVerify] {0},{1} ", userLogin.Username, userLogin.Password).ToList().FirstOrDefault();
            return authResponse;
        }

        public AuthResponse CheckLogin(UserLogin userLogin)
        {
            var authResponse = context.AuthUserSp.FromSqlRaw<AuthResponse>("EXEC usp_AuthUser {0},{1} ",userLogin.Username,userLogin.Password).ToList().FirstOrDefault();
            return authResponse;
        }

        public AuthResponse RegisterUser(UserLogin userLogin)
        {
            var authResponse = context.AuthUserSp.FromSqlRaw<AuthResponse>("EXEC [usp_RegisterUser] {0},{1} ", userLogin.Username, userLogin.Password).ToList().FirstOrDefault();
            return authResponse;
        }
    }
}
