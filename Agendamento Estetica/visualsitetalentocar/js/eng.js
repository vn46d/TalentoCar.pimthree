// 🔥 GERAR HORÁRIOS (fora da função)
function gerarHorarios() {
    const select = document.getElementById("horario");

    select.innerHTML = "<option value=''>Escolha um horário</option>";

    for (let h = 8; h < 18; h++) {
        let hora = (h < 10 ? "0" + h : h) + ":00";
        select.innerHTML += `<option value="${hora}">${hora}</option>`;
    }
}

// 🔥 roda quando a página abrir
window.onload = function () {
    gerarHorarios();
};


// 🔥 FUNÇÃO DE AGENDAR
function agendar() {

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const carro = document.getElementById("carro").value;
    const servico = document.getElementById("servico").value;
    const servicoEspecial = document.getElementById("servicoEspecial").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    const msg = document.getElementById("mensagem");

    // validação
    if (!nome || !telefone || !carro || (!servico && !servicoEspecial) || !data || !horario) {
        msg.innerText = "Preencha tudo!";
        msg.style.color = "red";
        return;
    }
//dados da lista
    let lista = JSON.parse(localStorage.getItem("agendamentos")) || [];

//repetição

    const jaExiste = lista.some(item =>
    item.data === data && item.horario === horario
);

if (jaExiste) {
    msg.innerText = "Esse horário já está ocupado!";
    msg.style.color = "orange";
    return;
}
    // salvar
    const agendamento = {
        nome,
        telefone,
        carro,
        servico,
        servicoEspecial,
        data,
        horario
    };

    lista.push(agendamento);
    
    localStorage.setItem("agendamentos", JSON.stringify(lista));
    fetch("http://localhost:5000/agendamentos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(agendamento)
});

    msg.innerText = "Agendado com sucesso!";
    msg.style.color = "lightgreen";

}