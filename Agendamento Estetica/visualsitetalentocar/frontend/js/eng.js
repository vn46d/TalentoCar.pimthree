function gerarHorarios() {
    const select = document.getElementById("horario");

    select.innerHTML = "<option value=''>Escolha um horário</option>";

    for (let h = 8; h < 18; h++) {
        let hora = (h < 10 ? "0" + h : h) + ":00";
        select.innerHTML += `<option value="${hora}">${hora}</option>`;
    }
}

window.onload = function () {
    gerarHorarios();
};

async function agendar() {

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const carro = document.getElementById("carro").value;
    const placa = document.getElementById("placa").value;
    const servico = document.getElementById("servico").value;
    const servicoEspecial = document.getElementById("servicoEspecial").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    const msg = document.getElementById("mensagem");

    if (!nome || !telefone || !carro || !placa || (!servico && !servicoEspecial) || !data || !horario) {
        msg.innerText = "Preencha tudo!";
        msg.style.color = "red";
        return;
    }

    let lista = JSON.parse(localStorage.getItem("agendamentos")) || [];

    const jaExiste = lista.some(item =>
        item.data === data && item.horario === horario
    );

    if (jaExiste) {
        msg.innerText = "Esse horário já está ocupado!";
        msg.style.color = "orange";
        return;
    }

    const agendamento = {
        nome,
        telefone,
        carro,
        servico,
        servicoEspecial,
        data,
        horario
    };

    try {

        // salva cliente
        await fetch("http://localhost:5103/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                telefone,
                carro,
                placa: placa
            })
        });

        // busca último cliente
        const resposta = await fetch("http://localhost:5103/clientes");
        const clientes = await resposta.json();

        const ultimoCliente = clientes[clientes.length - 1];

        // salva agendamento ligado ao cliente
        await fetch("http://localhost:5103/agendamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clienteId: clientes.length,
                servico,
                servicoEspecial,
                data,
                horario
            })
        });

        lista.push(agendamento);
        localStorage.setItem("agendamentos", JSON.stringify(lista));

        msg.innerText = "Agendamento realizado com sucesso!";
        msg.style.color = "lightgreen";

    } catch (error) {

        msg.innerText = "Erro ao salvar!";
        msg.style.color = "red";
        console.error(error);

    }

}