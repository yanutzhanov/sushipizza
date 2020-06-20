using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entites.DTOs.OrderDTO;
using Entites.Models;
using Entites.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SushiPizzaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ILoggerManager logger;
        private readonly IRepositoryWrapper repository;
        private readonly IMapper mapper;

        public OrdersController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            this.logger = logger;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet, Authorize]
        public IActionResult GetOrders()
        {
            if (User.IsInRole(UserRoles.User))
            {
                logger.LogInfo($"All orders returned from database to user with id: {User.Identity.Name}. Method GetOrders");
                return Ok(mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(repository.Order.GetOrdersWithDetailsForUser(Convert.ToInt32(User.Identity.Name))));
            }
            logger.LogInfo("All orders returned from database. Method GetOrders");
            return Ok(mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(repository.Order.GetOrdersWithDetails()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderForCreationDTO order)
        {
            if (order is null)
            {
                logger.LogError("Order object sent from client is null");
                return BadRequest("Order object is null");
            }
            repository.Order.CreateOrder(mapper.Map<OrderForCreationDTO, Order>(order));
            await repository.SaveAsync();
            logger.LogInfo("Order succesfully created");
            return Ok();
        }

        [HttpGet("{id}"), Authorize]
        public async Task<IActionResult> GetOrder(int id)
        {
            Order order = await repository.Order.GetOrderWithDetailsById(id);
            if (order is null)
            {
                logger.LogError($"Not found order with id: {id} in database. Method GetOrder");
                return NotFound();
            }
            if (User.IsInRole(UserRoles.User))
            {
                if (order.UserId.ToString() != User.Identity.Name)
                {
                    logger.LogError($"The order does not belong to user with id: {User.Identity.Name}");
                    return BadRequest($"The order does not belong to user");
                }
            }
            logger.LogInfo($"Order with id: {id} succesfully returned from database. Method GetOrder");
            return Ok(mapper.Map<Order, OrderDTO>(order));
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            Order order = await repository.Order.GetOrderById(id);
            if (order is null)
            {
                logger.LogError($"Order with id: {id} not found in database");
                return NotFound();
            }
            if (User.IsInRole(UserRoles.User))
            {
                if (order.UserId.ToString() != User.Identity.Name)
                {
                    logger.LogError($"The order does not belong to user with id: {User.Identity.Name}");
                    return BadRequest($"The order does not belong to user");
                }
            }
            repository.Order.DeleteOrder(order);
            await repository.SaveAsync();
            logger.LogInfo($"Order with id: {id} succesfully deleted from database");
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderForUpdateDTO order)
        {
            if (order is null)
            {
                logger.LogError("Order object sent from client is null");
                return BadRequest("Order object is null");
            }
            Order orderEntity = await repository.Order.GetOrderWithDetailsById(id);
            if (orderEntity is null)
            {
                logger.LogError($"Order with id: {id} not found in database");
                return NotFound();
            }
            if (User.IsInRole(UserRoles.User))
            {
                if (orderEntity.UserId.ToString() != User.Identity.Name)
                {
                    logger.LogError($"The order does not belong to user with id: {User.Identity.Name}");
                    return BadRequest($"The order does not belong to user");
                }
            }
            var orderEntityNew = mapper.Map<OrderForUpdateDTO, Order>(order);
            repository.Order.UpdateOrder(orderEntity, orderEntityNew);
            await repository.SaveAsync();
            logger.LogInfo($"Updated order with id: {id} in UpdateOrder method. His new id: {orderEntityNew.Id}");
            return NoContent();
        }
    }
}
