const API_KEY = "23f86d4060d63e25c58a1779"; 

async function obterCotacaoDolar() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        const data = await response.json();
        return data.conversion_rates.BRL;
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        alert("Não foi possível obter a cotação do dólar. Tente novamente mais tarde.");
        return null;
    }
}

async function conversao() {
    const inputReais = document.getElementById("valorReais");
    const resultadoElement = document.getElementById("resultado");
    const valorReais = parseFloat(inputReais.value);

    // Validação
    if (isNaN(valorReais) || valorReais <= 0) {
        resultadoElement.textContent = "Por favor, insira um valor válido em reais.";
        return;
    }

    resultadoElement.textContent = "Buscando cotação...";

    const cotacao = await obterCotacaoDolar();
    if (cotacao === null) return;

    const valorDolar = valorReais / cotacao;
    resultadoElement.textContent = `R$ ${valorReais.toFixed(2)} = US$ ${valorDolar.toFixed(2)}`;
}