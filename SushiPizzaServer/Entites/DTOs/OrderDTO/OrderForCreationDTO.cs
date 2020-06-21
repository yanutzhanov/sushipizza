using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entites.DTOs.OrderDTO
{
    public class OrderForCreationDTO
    {
        public ICollection<int> ProductsIds { get; set; }

        [StringLength(20, MinimumLength = 10, ErrorMessage = "Мы это уже проходили")]
        public string CustomerPhoneNumber { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "Интересный адрес")]
        public string Address { get; set; }
        public double TotalPrice { get; set; }
        public int? UserId { get; set; }
    }
}
