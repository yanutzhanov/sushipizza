using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entites.DTOs.OrderDTO
{
    public class OrderForUpdateDTO
    {
        public ICollection<int> ProductsIds { get; set; }

        [StringLength(20, MinimumLength = 10, ErrorMessage = "Мы это уже проходили")]
        public string CustomerPhoneNumber { get; set; }
        public int? UserId { get; set; }
    }
}
