using Contracts;
using Entites;
using Entites.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(RepositoryContext context) : base(context)
        {
        }
    }
}
