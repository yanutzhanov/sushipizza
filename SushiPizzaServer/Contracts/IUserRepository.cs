using Authentication;
using Entites.Models;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<JwtTokenResponse> GetJwtToken(string userPhoneNumber, string userPassword);
        Task<User> GetAuthenticatedUser(IIdentity identity);
        Task<User> GetUserById(int id);
    }
}
