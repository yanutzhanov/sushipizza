using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Authentication
{
    public class AuthOptions
    {
        public const string ISSUER = "SushiPizzaServer";
        public const string AUDIENCE = "SushiPizzaClient";
        private const string KEY = "somesecretkeyfortestcase";
        public const int LIFETIME = 1;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
