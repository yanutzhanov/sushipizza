using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entites.Models
{
    [Table("order")]
    public class Order : BaseEntity
    {
        public DateTime OrderTime { get; set; }
        [Required(ErrorMessage = "Не бесплатно же")]
        public double TotalPrice { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
        
        [StringLength(20, MinimumLength = 10, ErrorMessage = "Мы это уже проходили")]
        public string CustomerPhoneNumber { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "Интересный адрес")]
        public string Address { get; set; }
        public bool IsCompleted { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
        public User Customer { get; set; }
    }
}
