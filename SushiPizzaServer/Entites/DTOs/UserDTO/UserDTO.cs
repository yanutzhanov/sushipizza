using System.ComponentModel.DataAnnotations;

namespace Entites.DTOs.UserDTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Ну хотя бы имя дайте")]
        [StringLength(60, ErrorMessage = "Надеюсь имя не больше 60 символов")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Ну звонить хотя бы надо")]
        [StringLength(20, MinimumLength = 10, ErrorMessage = "Вы из КЗ?")]
        public string PhoneNumber { get; set; }

        [StringLength(30, ErrorMessage = "Больше 30 это много")]
        public string Address { get; set; }
        public double Discount { get; set; }
    }
}
