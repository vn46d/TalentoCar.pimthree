var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAll");

List<object> agendamentos = new List<object>();

app.MapPost("/agendamentos", (object agendamento) =>
{
    agendamentos.Add(agendamento);
    return Results.Ok(agendamento);
});

app.MapGet("/agendamentos", () =>
{
    return Results.Ok(agendamentos);
});

app.MapGet("/", () => "API TalentoCar está rodando 🚀");

app.Run();
