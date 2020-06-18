using AutoMapper;
using Entites.DTOs.ProductDTO;
using Entites.DTOs.UserDTO;
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
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<UserForCreationDTO, User>();
            CreateMap<UserForUpdateDTO, User>();

        }
    }
}
