using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseModel.Model
{
    [Keyless]
    public class AuthResponse
    {
        public string Username { get; set; }
        public string Status { get; set; }
        public string? Token { get; set; }
    }
}
