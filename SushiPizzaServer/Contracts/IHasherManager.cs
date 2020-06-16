using Entites.Models;

namespace Contracts
{
    public interface IHasherManager
    {
        bool VerifyPassword(string password, string hashedPassword);
        bool VerifyPassword(string password, User user);
        string GetHashedPassword(string password);
    }
}
