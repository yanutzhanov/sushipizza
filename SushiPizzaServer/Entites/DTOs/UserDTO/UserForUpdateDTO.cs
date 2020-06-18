using System.ComponentModel.DataAnnotations;

namespace Entites.DTOs.UserDTO
{
    public class UserForUpdateDTO
    {
        [Required(ErrorMessage = "Ну хотя бы имя дайте")]
        [StringLength(60, ErrorMessage = "Надеюсь имя не больше 60 символов")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Ну звонить хотя бы надо")]
        [StringLength(20, MinimumLength = 10, ErrorMessage = "Вы из КЗ?")]
        public string PhoneNumber { get; set; }

        [StringLength(30, ErrorMessage = "Больше 30 это много")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Регаешься регайся до конца")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Что у тебя за пароль?")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Регаешься регайся до конца")]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string PasswordConfirm { get; set; }
    }
}
