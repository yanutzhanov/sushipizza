using AutoMapper;
using Contracts;
using Entites.DTOs.UserDTO;
using Entites.Models;
using Entites.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SushiPizzaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILoggerManager logger;
        private readonly IRepositoryWrapper repository;
        private readonly IMapper mapper;

        public UsersController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            this.logger = logger;
            this.repository = repository;
            this.mapper = mapper;
        }


        [HttpGet, Authorize(Roles = UserRoles.Admin)]
        public IActionResult GetUsers()
        {
            logger.LogInfo("Admin is looking at accounts");
            return Ok(mapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(repository.User.GetAll()));
        }

        [HttpGet("{id}"), Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> GetUser(int id)
        {
            User userEntity = await repository.User.GetUserById(id);
            if (userEntity is null)
            {
                logger.LogError($"User with id: {User.Identity.Name} not found in database. Method GetUser");
                return NotFound();
            }
            logger.LogInfo($"Returned info about user with id: {id} from database. Method GetUser");
            return Ok(mapper.Map<User, UserDTO>(userEntity));
        }

        [HttpGet("Account"), Authorize]
        public async Task<IActionResult> GetAccount()
        {
            User user = await repository.User.GetAuthenticatedUser(User.Identity);
            if (user is null)
            {
                logger.LogError($"User with id: {User.Identity.Name} not found in database. Method GetAccount");
                return NotFound();
            }
            logger.LogInfo($"Succesfully returned information about user with id: {user.Id}");
            return Ok(mapper.Map<User, UserDTO>(user));
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserForCreationDTO user)
        {
            if (user is null)
            {
                logger.LogError("User object sent from client is null");
                return BadRequest("User object is null");
            }
            User userEntity = mapper.Map<UserForCreationDTO, User>(user);
            repository.User.Create(userEntity);
            await repository.SaveAsync();

            var token = await repository.User.GetJwtToken(userEntity.PhoneNumber, userEntity.Password);
            if (token == null)
                return BadRequest();
            logger.LogInfo("Registred new user");
            return Ok(token);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModelDTO user)
        {
            var token = await repository.User.GetJwtToken(user.PhoneNumber, user.Password);
            if (token is null)
            {
                logger.LogError($"Not found user with number: {user.PhoneNumber} and password: {user.Password}");
                return NotFound("Логин или пароль неверны");
            }
            logger.LogInfo("User signin complete");
            return Ok(token);
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDTO user)
        {
            if (user is null)
            {
                logger.LogError($"User object sent from client is null");
                return BadRequest("User object is null");
            }
            User userEntity = await repository.User.GetUserById(id);
            if (userEntity is null)
            {
                logger.LogError($"Not found user with id: {id} in database");
                return NotFound();
            }
            mapper.Map(user, userEntity);
            repository.User.Update(userEntity);
            await repository.SaveAsync();

            logger.LogInfo($"Updated user with id: {id} in UpdateUser method");
            return NoContent();
        }

        [HttpPut("{id}/ToAdmin"), Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> SwitchUserRoleToAdmin(int id)
        {
            User userEntity = await repository.User.GetUserById(id);
            if (userEntity is null)
            {
                logger.LogError($"Not found user with id: {id} in database");
                return NotFound();
            }
            userEntity.Role = UserRoles.Admin;
            repository.User.Update(userEntity);
            await repository.SaveAsync();
            logger.LogInfo($"User with id: {id} has become admin!");
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            User userEntity = await repository.User.GetUserById(id);
            if (userEntity is null)
            {
                logger.LogError($"Not found user with id: {id} in database");
                return NotFound();
            }
            repository.User.Delete(userEntity);
            await repository.SaveAsync();
            logger.LogInfo($"User with id: {id} was deleted from database in DeleteUser method");
            return NoContent();
        }
    }
}
