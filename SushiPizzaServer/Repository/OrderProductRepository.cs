using Contracts;
using Entites;
using Entites.Models;

namespace Repository
{
    public class OrderProductRepository : RepositoryBase<OrderProduct>, IOrderProductRepository
    {
        public OrderProductRepository(RepositoryContext context)
            : base(context) { }
    }
}
