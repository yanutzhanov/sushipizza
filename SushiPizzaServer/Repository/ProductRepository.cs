using Contracts;
using Entites;
using Entites.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(RepositoryContext context) : base(context)
        {
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await GetByCondition(p => p.Id == id).FirstOrDefaultAsync();
        }
    }
}
