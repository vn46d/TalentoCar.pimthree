function carregarAgendamentos() {
    fetch("http://localhost:5000/agendamentos")
    .then(res => res.json())
    .then(data => {
        const div = document.getElementById("lista");
        div.innerHTML = "";

        if (data.length === 0) {
            div.innerHTML = "<p style='color:white;'>Nenhum agendamento</p>";
            return;
        }

        data.forEach(item => {
            div.innerHTML += `
                <div class="card">
                    <strong>${item.nome}</strong><br>
                    📞 ${item.telefone}<br>
                    🚗 ${item.carro}<br>
                    📅 ${item.data} - ${item.horario}
                </div>
            `;
        });
    })
    .catch(err => {
        console.error("Erro:", err);
    });
}

window.onload = carregarAgendamentos;