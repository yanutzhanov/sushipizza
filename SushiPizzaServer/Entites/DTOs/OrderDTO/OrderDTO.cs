using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Entites.DTOs.UserDTO;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Entites.DTOs.ProductDTO;

namespace Entites.DTOs.OrderDTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime OrderTime { get; set; }
        [Required(ErrorMessage = "Не бесплатно же")]
        public double TotalPrice { get; set; }
        public ICollection<ProductDTO.ProductDTO> Products { get; set; }

        [StringLength(20, MinimumLength = 10, ErrorMessage = "Мы это уже проходили")]
        public string CustomerPhoneNumber { get; set; }
        public bool IsCompleted { get; set; }
        public int? UserId { get; set; }
    }
}
