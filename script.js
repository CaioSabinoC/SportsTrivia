const btn = document.getElementById("btnCuriosidade");
const box = document.getElementById("curiosidade");

btn.addEventListener("click", async () => {

    try {
        box.innerHTML = "<p>Loading...</p>";

        let response = await fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple");

        if (!response.ok) {
            throw new Error("Erro na API");
        }

        let data = await response.json();

        let curiosidade = data.results[Math.floor(Math.random() * data.results.length)];

        // embaralhar respostas
        let respostas = [...curiosidade.incorrect_answers, curiosidade.correct_answer];
        respostas.sort(() => Math.random() - 0.5);

        box.innerHTML = `
            <h2>${curiosidade.difficulty}</h2>
            <p>${curiosidade.question}</p>
            <div class="respostas">
                ${respostas.map(r => `<button class="resposta">${r}</button>`).join("")}
            </div>
        `;

        // evento nas respostas
        document.querySelectorAll(".resposta").forEach(btnResposta => {
            btnResposta.addEventListener("click", () => {

                if (btnResposta.textContent === curiosidade.correct_answer) {
                    btnResposta.style.background = "green";
                    vibrar(200);
                } else {
                    btnResposta.style.background = "red";
                    vibrar([100, 50, 100]);
                }
            });
        });

    } catch (error) {
        box.innerHTML = "<p>Erro ao carregar. Tente novamente.</p>";
        console.error(error);
    }
});

function vibrar(tempo) {
    if ("vibrate" in navigator) {
        navigator.vibrate(tempo);
    }
};

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => console.log("Service Worker registrado"))
            .catch(err => console.log("Erro:", err));
    });
}
