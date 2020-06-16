using System.Threading.Tasks;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IOrderProductRepository OrderProduct { get; }
        IOrderRepository Order { get; }
        IProductRepository Product { get; }
        IUserRepository User { get; }
        Task Save();
    }
}
