let mensagensVelhas = [];

function buscarMensagens()
{
  const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promessa.then(popularChat);
}

function popularChat(promessa)
{
  const mensagens = promessa.data;
  const chat = document.querySelector(".chat");
  
  for (let i = 0 ; i < 100 ; i++ )
  {
    const mensagemAtual = mensagens[i];

    if (mensagemAtual.type === "message")
    {
      chat.innerHTML += `
      <div class="mensagem" data-identifier="message">
        <span>(${mensagemAtual.time}) </span>
        <p><strong>${mensagemAtual.from}</strong> Para <strong>${mensagemAtual.to}<strong>: ${mensagemAtual.text}</p>
      </div>`;
    }

    else if (mensagemAtual.type === "private_message")
    {
      chat.innerHTML += `
      <div class="mensagem privado" data-identifier="message">
        <span>(${mensagemAtual.time}) </span>
        <p><strong>${mensagemAtual.from}</strong> reservadamente para <strong>${mensagemAtual.to}<strong> ${mensagemAtual.text}</p>
      </div>`;
    }
    
    else if (mensagemAtual.type === "status")
    {
      chat.innerHTML += `
      <div class="mensagem status" data-identifier="message">
        <span>(${mensagemAtual.time}) </span>
        <p><strong>${mensagemAtual.from}</strong> ${mensagemAtual.text}</p>
      </div>`;
    }
  }
}