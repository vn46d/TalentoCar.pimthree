CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    telefone VARCHAR(20),
    carro VARCHAR(50),
    servico VARCHAR(50),
    servico_especial VARCHAR(100),
    data DATE,
    horario TIME
);