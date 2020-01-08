using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Coding_challenge_BE.Models
{
    public class User
    {
       
        public User(int Id, String FirstName, String LastName,String Email,String Password)
        {
            this.Id = Id;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.Password = Password;
        }
        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        [JsonIgnore]    
         public String Password { get; set; } 

    }
}
