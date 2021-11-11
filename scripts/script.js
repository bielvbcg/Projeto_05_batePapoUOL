let ultimaMensagem = "";

function buscarMensagens()
{
  const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promessa.then(popularChat);
}

function popularChat(promessa)
{
  const mensagens = promessa.data;
  const chat = document.querySelector(".chat");
  const tempoMensagemNova = mensagens[mensagens.length - 1];
  
  if (ultimaMensagem.time === tempoMensagemNova.time){return;}
  ultimaMensagem = mensagens[mensagens.length - 1];

  chat.innerHTML = "";
  
  for (let i = 0 ; i < mensagens.length ; i++ )
  {
    const mensagemAtual = mensagens[i];
    
    switch (mensagemAtual.type) 
    {
      case "message":
        
        chat.innerHTML += `
        <div class="mensagem" data-identifier="message">
          <span>(${mensagemAtual.time}) </span>
          <p><strong>${mensagemAtual.from}</strong> Para <strong>${mensagemAtual.to}<strong>: ${mensagemAtual.text}</p>
        </div>`;

        break;

      case "private-message":
        
        chat.innerHTML += `
        <div class="mensagem privado" data-identifier="message">
          <span>(${mensagemAtual.time}) </span>
          <p><strong>${mensagemAtual.from}</strong> reservadamente para <strong>${mensagemAtual.to}<strong> ${mensagemAtual.text}</p>
        </div>`;

        break;

      case "status":

        chat.innerHTML += `
        <div class="mensagem status" data-identifier="message">
          <span>(${mensagemAtual.time}) </span>
          <p><strong>${mensagemAtual.from}</strong> ${mensagemAtual.text}</p>
        </div>`;

        break;
    }
  }
}

setInterval(buscarMensagens , 3000);