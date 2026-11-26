using HVBA.Backend.Services;
using HVBA.Backend.Data;
using HVBA.Backend.Hubs;
//using HVBA.Backend.Auth; later weer aanzetten
//using Microsoft.AspNetCore.Authentication.JwtBearer; later weer aanzetten
//using Microsoft.IdentityModel.Tokens; later weer aanzetten

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddMemoryCache();
builder.Services.AddSingleton<IOneTimePasswordStore, OneTimePasswordStore>();
builder.Services.AddHttpClient<KeycloakPasswordResetService>();
builder.Services.AddHostedService(sp => sp.GetRequiredService<KeycloakPasswordResetService>());

builder.Services.AddSingleton<CaseDataStore>();
builder.Services.AddScoped<CsvImportService>();
var allowedOrigins = new[]
{
    "http://localhost:5173/",
    builder.Configuration["AppbaseUrl"]?.TrimEnd('/') ?? "https://hvba-live.programmeren-ap.be/"
};

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// real-time berichten naar de frontend
builder.Services.AddSignalR();

// keycloak: access token van de frontend controleren
// var keycloakAuthority = $"{builder.Configuration["Keycloak:BaseUrl"]}/realms/{builder.Configuration["Keycloak:Realm"]}";

// builder.Services
//     .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.Authority = keycloakAuthority;               
//         options.RequireHttpsMetadata = !builder.Environment.IsDevelopment(); 
//         options.MapInboundClaims = false;                     

//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidIssuer = keycloakAuthority,
//             ValidateAudience = false,                   
//             NameClaimType = "preferred_username"
//         };

//         options.Events = new JwtBearerEvents
//         {
//             OnMessageReceived = context =>
//             {
//                 var accessToken = context.Request.Query["access_token"];

//                 if (!string.IsNullOrEmpty(accessToken) && context.HttpContext.Request.Path.StartsWithSegments("/hubs"))
//                 {
//                     context.Token = accessToken;
//                 }

//                 return Task.CompletedTask;
//             },

//             // rollen uit realm_access omzetten
//             OnTokenValidated = context =>
//             {
//                 KeycloakRoles.AddRealmRoles(context.Principal);
//                 return Task.CompletedTask;
//             }
//         };
//     });

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Frontend");

//app.UseAuthentication(); // token controleren => later weer aanzetten //
app.UseAuthorization(); // rollen

app.UseAuthorization();

app.MapControllers();

app.MapHub<CasesHub>("/hubs/cases");

app.Run();
