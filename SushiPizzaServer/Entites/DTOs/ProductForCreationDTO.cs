using System.ComponentModel.DataAnnotations;

namespace Entites.DTOs
{
    public class ProductForCreationDTO
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        public string Composition { get; set; }
        public double Price { get; set; }
        public string Type { get; set; }
    }
}
