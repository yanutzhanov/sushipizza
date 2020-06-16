using System.ComponentModel.DataAnnotations.Schema;

namespace Entites.Models
{
    [Table("orderproduct")]
    public class OrderProduct : BaseEntity
    {
        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public Product Product { get; set; }

    }
}
