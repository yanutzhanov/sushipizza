using Contracts;
using Entites.Models;
using System.Security.Cryptography;
using System.Text;

namespace HashService
{
    public class HasherManager : IHasherManager
    {
        public string GetHashedPassword(string password)
        {
            return GetHashString(password);
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            return GetHashString(password).Equals(hashedPassword);
        }

        public bool VerifyPassword(string password, User user)
        {
            return GetHashString(password).Equals(user.Password);
        }

        private string GetHashString(string s)
        {
            byte[] bytes = Encoding.Unicode.GetBytes(s);
            MD5CryptoServiceProvider CSP = new MD5CryptoServiceProvider();
            byte[] byteHash = CSP.ComputeHash(bytes);
            StringBuilder hash = new StringBuilder();
            foreach (byte b in byteHash)
                hash.Append(string.Format("{0:x2}", b));
            return hash.ToString();
        }
    }
}
