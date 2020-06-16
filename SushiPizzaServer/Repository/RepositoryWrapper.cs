using Contracts;
using Entites;
using Entites.Models;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext context;
        private IOrderProductRepository orderProduct;
        private IOrderRepository order;
        private IProductRepository product;
        private IUserRepository user;
        public IOrderProductRepository OrderProduct
        {
            get
            {
                if (orderProduct is null)
                    orderProduct = new OrderProductRepository(context);
                return orderProduct;
            }
        }

        public IOrderRepository Order
        {
            get
            {
                if (order is null)
                    order = new OrderRepository(context);
                return order;
            }
        }

        public IProductRepository Product
        {
            get
            {
                if (product is null)
                    product = new ProductRepository(context);
                return product;
            }
        }

        public IUserRepository User
        {
            get
            {
                if (user is null)
                    user = new UserRepository(context);
                return user;
            }
        }

        public RepositoryWrapper(RepositoryContext context)
        {
            this.context = context;
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
