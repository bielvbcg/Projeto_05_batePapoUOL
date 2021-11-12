const url = "https://mock-api.driven.com.br/api/v4/uol"
let ultimaMensagem = "";
let chatIniciado = false;
let name;

function logarChat()
{
  const input = document.querySelector(".tela-login input");
  name = input.value;
  const promessa = axios.post(`${url}/participants` , {name});

  input.value = "";

  promessa.then(iniciarChat);
  promessa.catch(logarChat);
}

function iniciarChat()
{
  const telaLogin = document.querySelector(".tela-login");
  telaLogin.classList.toggle("escondido");

  chatIniciado = true;

  buscarMensagens();
  manterConexao();

  setInterval(buscarMensagens , 3000);
  setInterval(manterConexao , 5000);
}

function manterConexao()
{
  const promessa = axios.post(`${url}/status` , {name});
  promessa.catch(recarregarPagina);
}

function recarregarPagina()
{
  const telaLogin = document.querySelector(".tela-login");
  telaLogin.classList.toggle(".escondido");
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
  
  if (ultimaMensagem.time === tempoMensagemNova.time) return;
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
        
      if (mensagemAtual.from === name || mensagemAtual.to === name){
        chat.innerHTML += `
        <div class="mensagem privado" data-identifier="message">
          <span>(${mensagemAtual.time}) </span>
          <p><strong>${mensagemAtual.from}</strong> reservadamente para <strong>${mensagemAtual.to}</strong> ${mensagemAtual.text}</p>
        </div>`;
      }

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

function enviarMensagem()
{
  const mensagem = document.querySelector(".barra-mensagens input");
  const envio = axios.post(`${url}/messages` , {
    from: name,
    to: "Todos",
    text: mensagem.value,
    type: "message"
  });

  envio.then(buscarMensagens);
  envio.catch(logarChat);

  mensagem.value = "";
}

document.addEventListener("keydown" , function (evento) 
{
  if (evento.keyCode !== 13) return;

  if (chatIniciado) {enviarMensagem();}
  else {logarChat();}
})