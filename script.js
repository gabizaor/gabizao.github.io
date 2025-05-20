document
  .getElementById("formContato")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    // Validação simples
    if (nome === "" || email === "" || mensagem === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Envia para o Google Apps Script
    const formData = { nome, email, mensagem };
    fetch(
      "https://script.google.com/macros/s/AKfycbw4W7u17JxLuiVAqezX_LFqg2L2fEu0D9GphOVqkh18w8K7ncVa21zXgx26M879wkWmSQ/exec",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const mensagemConfirmacao = document.getElementById(
          "mensagem-confirmacao"
        );
        mensagemConfirmacao.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada.`;
        mensagemConfirmacao.style.display = "block";
        document.getElementById("formContato").reset();
      })
      .catch((error) => {
        alert("Erro ao enviar. Tente novamente.");
      });
  });
