function carregarAgendamentos() {
    const lista = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const div = document.getElementById("listaAgendamentos");

    div.innerHTML = "";

    lista.forEach((item, index) => {
        div.innerHTML += `
            <div style="border:1px solid #ccc; margin:5px; padding:5px;">
                <strong>${item.nome}</strong><br>
                📞 ${item.telefone}<br>
                🚗 ${item.carro}<br>
                📅 ${item.data} - ${item.horario}<br>
                <button onclick="excluir(${index})">Excluir</button>
            </div>
        `;
    });
}

function gerarHorarios() {
    const select = document.getElementById("horario");
    const lista = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const dataSelecionada = document.getElementById("data").value;

    select.innerHTML = "<option value=''>Escolha um horário</option>";

    for (let h = 8; h < 18; h++) {
        let hora = (h < 10 ? "0" + h : h) + ":00";

        const ocupado = lista.some(item =>
            item.data === dataSelecionada && item.horario === hora
        );

        if (!ocupado) {
            select.innerHTML += `<option value="${hora}">${hora}</option>`;
        }
    }
}

function excluir(index) {
    let lista = JSON.parse(localStorage.getItem("agendamentos")) || [];
    lista.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(lista));
    carregarAgendamentos();
}

window.onload = function () {
    carregarAgendamentos();
};