using Backend.Data;
using Backend.MappingProfiles;
using Backend.Models.MappingProfiles;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Swagger/OpenAPI for the app
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQL Server connection string
builder.Services.AddDbContext<RentifyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register AutoMapper with all assemblies and the specific mapping profiles
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); // Auto-detect all profiles
builder.Services.AddAutoMapper(typeof(UserProfile)); // Register User mapping profile
builder.Services.AddAutoMapper(typeof(PropertyTypeProfile)); // Register PropertyType mapping profile
builder.Services.AddAutoMapper(typeof(MessageProfile)); // Register Message mapping profile

// Register services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPropertyTypeService, PropertyTypeService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IListingService, ListingService>();
builder.Services.AddScoped<IMessageService, MessageService>();

// Add and configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>  // Consistent naming
    {
        policy.WithOrigins("http://localhost:5173")  // Allow frontend origin
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();  // Allow credentials (cookies, auth headers)
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend"); // Use the same CORS policy name

app.UseAuthorization();

app.MapControllers();

app.Run();
