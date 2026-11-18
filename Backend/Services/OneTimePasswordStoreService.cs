using System;
using System.Security.Cryptography;
using Microsoft.Extensions.Caching.Memory;

namespace HVBA.Backend.Services
{
    public interface IOneTimePasswordStore
    {
        string StorePassword(string password, TimeSpan linkValidity);
        bool Exists(string token);
        string? ConsumePassword(string token);
    }

    public class OneTimePasswordStore : IOneTimePasswordStore
    {
        private readonly IMemoryCache _cache;

        public OneTimePasswordStore(IMemoryCache cache)
        {
            _cache = cache;
        }

        public string StorePassword(string password, TimeSpan linkValidity)
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(32);
            var token = Convert.ToBase64String(tokenBytes)
                .Replace("+", "-")
                .Replace("/", "_")
                .TrimEnd('=');

            _cache.Set($"otp_{token}", password, linkValidity);
            return token;
        }

        public bool Exists(string token)
        {
            return _cache.TryGetValue($"otp_{token}", out _);
        }

        public string? ConsumePassword(string token)
        {
            var key = $"otp_{token}";

            if (_cache.TryGetValue(key, out string? password))
            {
                _cache.Remove(key);
                return password;
            }

            return null;
        }
    }
}