const url = "https://mock-api.driven.com.br/api/v4/uol"
let ultimaMensagem = "";
let name;

function logarChat()
{
  name = prompt("Digite seu nome");
  const promessa = axios.post(`${url}/participants` , {name});

  promessa.then(iniciarChat);
  promessa.catch(logarChat);
}

function iniciarChat()
{
  buscarMensagens();
  manterConexao();

  setInterval(buscarMensagens , 3000);
  setInterval(manterConexao , 5000);
}

function manterConexao()
{
  const promessa = axios.post(`${url}/status` , {name});
}

function buscarMensagens()
{
  const promessa = axios.get(`${url}/messages`);
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
          <p><strong>${mensagemAtual.from}</strong> Para <strong>${mensagemAtual.to}</strong>: ${mensagemAtual.text}</p>
        </div>`;

        break;

      case "private_message":
        
        chat.innerHTML += `
        <div class="mensagem privado" data-identifier="message">
          <span>(${mensagemAtual.time}) </span>
          <p><strong>${mensagemAtual.from}</strong> reservadamente para <strong>${mensagemAtual.to}</strong> ${mensagemAtual.text}</p>
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
  const mostrarUltimaMensagem = document.querySelector(".chat .mensagem:last-child");
  mostrarUltimaMensagem.scrollIntoView();
}