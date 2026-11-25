using System.Security.Claims;
using System.Text.Json;

namespace HVBA.Backend.Auth
{
    public static class KeycloakRoles
    {
        public static void AddRealmRoles(ClaimsPrincipal? principal)
        {
            if (principal?.Identity is not ClaimsIdentity identity)
            {
                return;
            }

            var realmAccess = identity.FindFirst("realm_access")?.Value;

            if (string.IsNullOrEmpty(realmAccess))
            {
                return;
            }

            using var document = JsonDocument.Parse(realmAccess);

            if (!document.RootElement.TryGetProperty("roles", out var roles))
            {
                return;
            }

            foreach (var role in roles.EnumerateArray())
            {
                var roleName = role.GetString();

                if (!string.IsNullOrEmpty(roleName))
                {
                    identity.AddClaim(new Claim(identity.RoleClaimType, roleName));
                }
            }
        }
    }
}