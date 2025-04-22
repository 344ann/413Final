using FinalProject.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntertainerContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainerConnection")));

builder.Services.AddCors(options => 
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // Allow only this origin
                .AllowAnyMethod() // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                .AllowAnyHeader(); // Allow all headers
        }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable the CORS policy defined above so the backend can accept requests from the React frontend
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
