var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
);

List<object> agendamentos = new List<object>();

app.MapPost("/agendamentos", (object agendamento) =>
{
    agendamentos.Add(agendamento);
    return Results.Ok();
});

app.MapGet("/agendamentos", () =>
{
    return Results.Ok(agendamentos);
});

app.Run();