var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// 🔓 libera acesso do seu site
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
);

List<object> agendamentos = new List<object>();

// 📥 salvar agendamento
app.MapPost("/agendamentos", (object agendamento) =>
{
    agendamentos.Add(agendamento);
    return Results.Ok();
});

// 📤 listar agendamentos
app.MapGet("/agendamentos", () =>
{
    return Results.Ok(agendamentos);
});

app.Run();