using Microsoft.Data.SqlClient;

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

string conexao =
    "Server=DESKTOP-CIORM6F\\SQLEXPRESS;Database=TalentoCarEsteticaAutomotiva;Trusted_Connection=True;TrustServerCertificate=True;";

app.MapPost("/clientes", (Cliente cliente) =>
{
    using SqlConnection conn = new(conexao);
    conn.Open();

    string sql = @"INSERT INTO clientes
                   (nome, telefone, carro, placa)
                   VALUES
                   (@nome,@telefone,@carro,@placa)";

    using SqlCommand cmd = new(sql, conn);

    cmd.Parameters.AddWithValue("@nome", cliente.Nome);
    cmd.Parameters.AddWithValue("@telefone", cliente.Telefone);
    cmd.Parameters.AddWithValue("@carro", cliente.Carro);
    cmd.Parameters.AddWithValue("@placa", cliente.Placa);

    cmd.ExecuteNonQuery();

    return Results.Ok("Cliente salvo com sucesso");
});

app.MapGet("/clientes", () =>
{
    List<Cliente> clientes = new();

    using SqlConnection conn = new(conexao);
    conn.Open();

    string sql = "SELECT nome, telefone, carro, placa FROM clientes";

    using SqlCommand cmd = new(sql, conn);
    using SqlDataReader reader = cmd.ExecuteReader();

    while (reader.Read())
    {
        clientes.Add(new Cliente
        {
            Nome = reader.GetString(0),
            Telefone = reader.GetString(1),
            Carro = reader.GetString(2),
            Placa = reader.GetString(3)
        });
    }

    return Results.Ok(clientes);
});

app.MapPost("/agendamentos", (Agendamento agendamento) =>
{
    using SqlConnection conn = new(conexao);
    conn.Open();

    string sql = @"
    INSERT INTO agendamentos
    (clienteid, servico, servicoEspecial, dataAgendamento, horario, status)

    VALUES
    (@clienteid,@servico,@servicoEspecial,@data,@horario,'Pendente')";

    using SqlCommand cmd = new(sql, conn);

    cmd.Parameters.AddWithValue("@clienteid", agendamento.ClienteId);
    cmd.Parameters.AddWithValue("@servico", agendamento.Servico);

    cmd.Parameters.AddWithValue(
        "@servicoEspecial",
        string.IsNullOrEmpty(agendamento.ServicoEspecial)
            ? DBNull.Value
            : agendamento.ServicoEspecial
    );

    cmd.Parameters.AddWithValue("@data", agendamento.Data);
    cmd.Parameters.AddWithValue("@horario", agendamento.Horario);

    cmd.ExecuteNonQuery();

    return Results.Ok("Agendamento salvo com sucesso");
});

app.MapGet("/", () => "API TalentoCar rodando 🚀");

app.Run();

public class Cliente
{
    public string Nome { get; set; }
    public string Telefone { get; set; }
    public string Carro { get; set; }
    public string Placa { get; set; }
}

public class Agendamento
{
    public int ClienteId { get; set; }
    public string Servico { get; set; }
    public string? ServicoEspecial { get; set; }
    public DateTime Data { get; set; }
    public string Horario { get; set; }
}