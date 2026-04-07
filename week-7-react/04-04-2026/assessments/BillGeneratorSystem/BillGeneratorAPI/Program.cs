using Microsoft.EntityFrameworkCore;
using BillGeneratorAPI.Data;
using BillGeneratorAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure SQL Server Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlServerOptionsAction: sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
        }));

// Register Services (Dependency Injection)
builder.Services.AddScoped<ICatalogService, CatalogService>();
builder.Services.AddScoped<IBillService, BillService>();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Bill Generator API",
        Version = "v1",
        Description = "Multi-Catalog Bill Generator System API"
    });
});

// Add CORS for React frontend (allow any localhost port)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.SetIsOriginAllowed(origin =>
                {
                    var uri = new Uri(origin);
                    return uri.Host == "localhost" || uri.Host == "127.0.0.1";
                })
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// ========================================
// SEED DATABASE ON STARTUP
// ========================================
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        await DbSeeder.SeedDataAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bill Generator API V1");
        c.RoutePrefix = string.Empty; // Swagger at root URL
    });
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();