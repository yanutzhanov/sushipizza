using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entites.Models
{
    [Table("user")]
    public class User : BaseEntity
    {
        [Required(ErrorMessage = "Ну хотя бы имя дайте")]
        [StringLength(60, ErrorMessage = "Надеюсь имя не больше 60 символов")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Ну звонить хотя бы надо")]
        [StringLength(12, MinimumLength = 10, ErrorMessage = "Вы из КЗ?")]
        public string PhoneNumber { get; set; }

        [StringLength(30, ErrorMessage = "Больше 30 это много")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Регаешься регайся до конца")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Что у тебя за пароль?")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Роль важна")]
        public string Role { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
