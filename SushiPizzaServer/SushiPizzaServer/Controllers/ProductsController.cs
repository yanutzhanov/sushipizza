using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entites.DTOs;
using Entites.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SushiPizzaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ILoggerManager logger;
        private readonly IRepositoryWrapper repository;
        private readonly IMapper mapper;

        public ProductsController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            this.logger = logger;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            logger.LogInfo($"Returned all products in GetProducts method from database");
            return Ok(mapper.Map<IEnumerable<ProductDTO>>(repository.Product.GetAll()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            Product product = await repository.Product.GetByIdAsync(id);
            if (product is null)
            {
                logger.LogError($"Not found product with id: {id} in database");
                return NotFound();
            }
            logger.LogInfo($"Returned product with id: {id} in GetProduct method from database");
            return Ok(mapper.Map<ProductDTO>(product));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductForCreationDTO product)
        {
            if (product is null)
            {
                logger.LogError($"Product object sent from client is null");
                return BadRequest("Product object is null");
            }

            Product productEntity = mapper.Map<Product>(product);
            repository.Product.Create(productEntity);
            await repository.SaveAsync();

            ProductDTO createdProduct = mapper.Map<ProductDTO>(productEntity);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductForUpdateDTO product)
        {
            if (product is null)
            {
                logger.LogError($"Product object sent from client is null");
                return BadRequest("Product object is null");
            }

            Product productEntity = await repository.Product.GetByIdAsync(id);
            if (product is null)
            {
                logger.LogError($"Not found product with id: {id} in database");
                return NotFound();
            }
            mapper.Map(product, productEntity);
            repository.Product.Update(productEntity);
            await repository.SaveAsync();
            logger.LogInfo($"Updated product with id: {id} in UpdateProduct method");
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            Product product = await repository.Product.GetByIdAsync(id);
            if (product is null)
            {
                logger.LogError($"Not found product with id: {id} in database");
                return NotFound();
            }
            repository.Product.Delete(product);
            await repository.SaveAsync();
            logger.LogInfo($"Product with id: {id} was deleted from database in DeleteProduct method");
            return NoContent();
        }

    }
}
