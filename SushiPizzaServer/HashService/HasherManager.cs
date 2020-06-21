using Contracts;
using Entites.Models;
using System.Security.Cryptography;
using System.Text;

namespace HashService
{
    public static class HasherManager
    {
        public static string GetHashedPassword(string password)
        {
            return GetHashString(password);
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            return GetHashString(password).Equals(hashedPassword);
        }

        public static bool VerifyPassword(string password, User user)
        {
            return GetHashString(password).Equals(user.Password);
        }

        private static string GetHashString(string s)
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
