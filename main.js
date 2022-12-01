const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "/464007.svg";
const PERSON_IMG = "red.svg";
const BOT_NAME = "Cynthia";
const PERSON_NAME = "Red";

window.onload = function () {
  // wait 2 seconds before showing the bot typing
  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", "Bem vindo ao assistente de batalha Pokemon!");
  }, 1000);
  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", "Digite o nome do pokemon que você está lutando contra");
  }, 2000);
};

msgerForm.addEventListener("submit", async event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  if(msgText == "pare"){
    appendMessage(BOT_NAME, BOT_IMG, "left", "Obrigado por usar o Assistente de batalha!" );
    msgerInput.disabled = true;
    msgerInput.placeholder = "Assistente desativado";
    return;
  }
  axios.get(`http://127.0.0.1:8000/?txt=${msgText}`)
  .then(function (response) {
    const {mensagens, sprites,openDex} = response.data;
    console.log(response.data)
    if(!mensagens) 
      appendMessage(BOT_NAME, BOT_IMG, "left", "Erro de conexão" );

      mensagens.forEach((e, i) => {
        setTimeout(() => {
          appendMessage(BOT_NAME, BOT_IMG, "left", e);
        }, 1000 * (i + 1));
      });
      if(openDex){
        setTimeout(() => {
        window.open("https://www.pokemon.com/br/pokedex/");
        }, 4000);
        return;
      }
    
  });
});

function appendMessage(name, img, side, text, imagem) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>` +
        (imagem ? `<div class="msg-text"><img src="${imagem}" style="width: 100px; height: 100px;"></div>` : `<div class="msg-text">${text}</div>`) +
        `
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export { };
