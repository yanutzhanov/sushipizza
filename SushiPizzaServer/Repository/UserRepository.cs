using Authentication;
using Contracts;
using Entites;
using Entites.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;

namespace Repository
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext context) : base(context)
        {
            
        }

        public JwtTokenResponse GetJwtToken(string userPhoneNumber, string userPassword)
        {
            ClaimsIdentity identity = GetIdentity(userPhoneNumber, userPassword);
            if (identity is null)
                return null;

            JwtSecurityToken jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: DateTime.Now,
                claims: identity.Claims,
                expires: DateTime.Now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );
            string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return new JwtTokenResponse { JwtToken = encodedJwt, UserFullName = identity.Name };
        }

        private ClaimsIdentity GetIdentity(string userPhoneNumber, string userPassword)
        {
            User user = GetByCondition(u => u.PhoneNumber == userPhoneNumber && u.Password == userPassword).FirstOrDefault();
            if (user is null)
                return null;
            var claims = new List<Claim>()
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.FullName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
