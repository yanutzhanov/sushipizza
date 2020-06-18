using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entites.DTOs.UserDTO
{
    public class UserLoginModelDTO
    {
        [Required(ErrorMessage = "Тебя только по паролю искать?")]
        [StringLength(20, MinimumLength = 10, ErrorMessage = "Вы из КЗ?")]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "Пароль же ну")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Что у тебя за пароль?")]
        public string Password { get; set; }
    }
}
