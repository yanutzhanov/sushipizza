using Entites.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IOrderRepository : IRepositoryBase<Order>
    {
        IEnumerable<Order> GetOrdersWithDetails();
        IEnumerable<Order> GetOrdersWithDetailsForUser(int userId)
        void CreateOrder(Order order);
        Task<Order> GetOrderWithDetailsById(int id);
        void DeleteOrder(Order order);
        Task<Order> GetOrderById(int id);
        void UpdateOrder(Order order, Order orderNew);
    }
}
