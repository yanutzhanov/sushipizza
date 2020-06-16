using AutoMapper;
using Entites.DTOs;
using Entites.Models;

namespace SushiPizzaServer
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductDTO, Product>();
            CreateMap<ProductForCreationDTO, Product>();
            CreateMap<ProductForUpdateDTO, Product>();
        }
    }
}
