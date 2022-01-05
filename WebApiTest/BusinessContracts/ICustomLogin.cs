using System;
using System.Collections.Generic;
using System.Text;
using DatabaseModel.Model;

namespace BusinessContracts
{
    public interface ICustomLogin
    {
        public AuthResponse CheckLogin(UserLogin userLogin);
        public AuthResponse AuthToken(UserLogin userLogin);
        public AuthResponse RegisterUser(UserLogin userLogin);
    }
}
