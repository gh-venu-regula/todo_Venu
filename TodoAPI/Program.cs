using System.Text;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using TodoAPI.Data;
using TodoAPI.Mapper;
using TodoAPI.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//adding CORS policy
// This is important for enabling cross-origin requests
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

//Adding Auth Service
// for handling authentication-related operations
builder.Services.AddScoped<IAuthService, AuthService>();

//Adding Task Service
// for handling task-related operations
builder.Services.AddScoped<ITaskService, TaskService>();

//Adding Automapper
// for object mapping between DTOs and models
builder.Services.AddAutoMapper(typeof(AutoMappingProfile));

//Adding Authentication
// Ensure JwtSettings in appsettings.json contains Issuer, Audience, and Key
var JwtSettings = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = JwtSettings["Issuer"],
            ValidAudience = JwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings["Key"]))
        };
    });

//adding SwaggerUI
// Security definitions added for JWT Bearer token authentication
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter JWT with Bearer into field. Example: Bearer {token}",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});



//adding Dbcontext
// for database operations with retry on failure
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
    sqlOptions => sqlOptions.EnableRetryOnFailure()));


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Enabling CORS middleware for the "AllowAllOrigins" policy
app.UseCors("AllowAllOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1"));
}
app.UseHttpsRedirection();

// Adding Authentication middleware
app.UseAuthentication();

// Adding Authorization middleware
app.UseAuthorization();

// Mapping controllers to handle API endpoints
app.MapControllers();

app.Run();
