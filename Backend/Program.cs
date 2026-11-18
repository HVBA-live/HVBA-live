using HVBA.Backend.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddMemoryCache();
builder.Services.AddSingleton<IOneTimePasswordStore, OneTimePasswordStore>();
builder.Services.AddHttpClient<KeycloakPasswordResetService>();
builder.Services.AddHostedService(sp => sp.GetRequiredService<KeycloakPasswordResetService>());
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

app.UseAuthorization();

app.MapControllers();

app.Run();
