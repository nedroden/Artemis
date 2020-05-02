// ------------------------------------------------
// ARTEMIS - Open source forum software
// version 1.0 Alpha
//
// @project     Artemis API
// @author      Robert Monden
// @website     https://robertmonden.com/artemis
// @copyright   2020, Artemis
// @license     Apache 2.0; see LICENSE.txt
// ------------------------------------------------

namespace Artemis.Filters
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.Extensions.DependencyInjection;

    using Models;

    public class AuthorizedAttribute : Attribute, IAsyncActionFilter
    {
        private string _permissionName;

        public AuthorizedAttribute(string permissionName) => _permissionName = permissionName;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ForumDbContext dbContext = context.HttpContext.RequestServices.GetRequiredService<ForumDbContext>();
            bool isGuest = !context.HttpContext.User.Identity.IsAuthenticated;

            if (isGuest)
            {
                Group guestGroup = dbContext.Groups.Where((Group group) => group.Id == 4).FirstOrDefault();
                if (guestGroup != null && guestGroup.HasPermission(_permissionName))
                {
                    await next();

                    return;
                }
            }
            else if (context.HttpContext.User.HasClaim((Claim claim) => claim.Type == JwtRegisteredClaimNames.NameId))
            {
                Claim nameId = context.HttpContext.User.Claims
                    .Where(claim => claim.Type == JwtRegisteredClaimNames.NameId).FirstOrDefault();

                User user = dbContext.Users.Where((User user) => user.Id.ToString() == nameId.Value).FirstOrDefault();
                if (user != null && user.HasPermission(_permissionName))
                {
                    await next();

                    return;
                }
            }

            context.Result = new UnauthorizedResult();
        }
    }
}