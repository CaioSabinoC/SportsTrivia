
async function getCuriosidade() {

    let response = await fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple");
    let data = await response.json();

    console.log(data);


    let curiosidade = data.results[Math.floor(Math.random() * data.results.length)];

    document.getElementById("curiosidade").innerHTML = `
        <h2>${curiosidade.difficulty}</h2>
        <p>${curiosidade.question}</p>
        <p><strong>Resposta:</strong> ${curiosidade.correct_answer}</p>
    `;
}
