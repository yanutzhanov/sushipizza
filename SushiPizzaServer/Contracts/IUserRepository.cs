using Authentication;
using Entites.Models;

namespace Contracts
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        JwtTokenResponse GetJwtToken(string userPhoneNumber, string userPassword);
    }
}
