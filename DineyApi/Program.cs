using DineyApi.Clients;
using DineyApi.GraphQL;

namespace DineyApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // =========================
            // SERVICES
            // =========================

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddHttpClient<DisneyApiClient>(client =>
            {
                client.BaseAddress = new Uri("https://api.disneyapi.dev/");
            });

            builder.Services
                .AddGraphQLServer()
                .AddQueryType<CharacterQuery>();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins(
                        "http://localhost:5500",
                        "http://127.0.0.1:5500"
                    )
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // =========================
            // PIPELINE
            // =========================

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowFrontend");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();
            app.MapGraphQL();

            app.Run();
        }
    }
}