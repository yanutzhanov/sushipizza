using Entites.Models;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        Task<Product> GetByIdAsync(int id);
    }
}
