using AutoMapper;
using Entites.DTOs.OrderDTO;
using Entites.DTOs.ProductDTO;
using Entites.DTOs.UserDTO;
using Entites.Models;
using System.Linq;

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
            CreateMap<Order, OrderDTO>()
                .ForMember(odto => odto.Products, o => o.MapFrom(src => src.OrderProducts.Select(op => op.Product)));
            CreateMap<OrderForCreationDTO, Order>()
                .ForMember(o => o.OrderProducts, ofc => ofc.MapFrom(src => src.ProductsIds.Select(pi => new OrderProduct { ProductId = pi })));
            CreateMap<OrderForUpdateDTO, Order>()
                .ForMember(o => o.OrderProducts, ofc => ofc.MapFrom(src => src.ProductsIds.Select(pi => new OrderProduct { ProductId = pi })));
        }
    }
}
