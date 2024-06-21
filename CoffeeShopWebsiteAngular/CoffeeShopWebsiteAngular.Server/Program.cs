using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using POS_Folders.Repository;
using POS_Folders.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<ICustomerServices, CustomerServices>();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Allow requests from this origin
                   .AllowAnyMethod()  // Allow any HTTP method (GET, POST, PUT, etc.)
                   .AllowAnyHeader(); // Allow any HTTP headers
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";
    });
}
else
{
    // Configure CORS for production if needed
    // options.AddPolicy(...)
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors("AllowSpecificOrigin"); // Apply CORS policy globally

app.MapControllers();

app.Run();