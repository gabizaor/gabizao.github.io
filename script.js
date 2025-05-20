//
// Nome: Gabrielly Reis
// Disciplina: Fundamentos da Programação Web
// Data: 19/05/2025
// Descrição: Script responsável pelo envio do formulário de contato, validação dos campos e exibição de mensagem de confirmação ou erro.
//

// Seleciona o formulário de contato e adiciona um listener para o evento de envio
document
  .getElementById("formContato")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
    // Valida se todos os campos estão preenchidos antes de enviar
    if (nome === "" || email === "" || mensagem === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    const formData = { nome, email, mensagem };
    // Envia os dados do formulário para o Google Apps Script via requisição POST
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
        // Exibe mensagem de confirmação ou erro conforme o resultado
        mensagemConfirmacao.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada.`;
        mensagemConfirmacao.style.display = "block";
        document.getElementById("formContato").reset();
      })
      .catch((error) => {
        alert("Erro ao enviar. Tente novamente.");
      });
  });
