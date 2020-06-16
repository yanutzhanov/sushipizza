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
        [Required(ErrorMessage = "А перезванивать куда?")]
        [StringLength(12, MinimumLength = 10, ErrorMessage = "Мы это уже проходили")]
        public string CustomerPhoneNumber { get; set; }
        public bool IsCompleted { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
        public User Customer { get; set; }
    }
}
