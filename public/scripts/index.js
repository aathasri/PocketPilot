var cBtn = document.querySelector("#courses");
var eBtn = document.querySelector("#exam");
var aBtn = document.querySelector("#assignment");
var botBtn = document.querySelector("#botBtn");
var botBtn02 = document.querySelector("#botBtn02");
var closeBot = document.querySelector("#closeBot");
var alertBtn = document.querySelector("#alertClose");

const courseForm = () => {
  var cForm = document.querySelector("#cForm");
  var cOpen = cForm.dataset.form;
  console.log(cOpen);
  if (cOpen == "true") {
    cForm.dataset.form = false;
    cForm.style.display = "none";
  } else {
    cForm.dataset.form = true;
    cForm.style.display = "block";
  }
};
const examForm = () => {
  var eForm = document.querySelector("#eForm");
  var eOpen = eForm.dataset.form;
  if (eOpen == "true") {
    eForm.dataset.form = false;
    eForm.style.display = "none";
  } else {
    eForm.dataset.form = true;
    eForm.style.display = "block";
  }
};
const assignForm = () => {
  var aForm = document.querySelector("#aForm");
  var aOpen = aForm.dataset.form;
  if (aOpen == "true") {
    aForm.dataset.form = false;
    aForm.style.display = "none";
  } else {
    aForm.dataset.form = true;
    aForm.style.display = "block";
  }
};
const chatbotOpen = () => {
  var chatbot = document.querySelector("#chatbot");
  var botOpen = botBtn.dataset.bot;
  console.log(botOpen);
  if (botOpen == "true") {
    botBtn.dataset.bot = "false";
    chatbot.style.display = "none";
  } else {
    botBtn.dataset.bot = "true";
    chatbot.style.display = "block";
  }
};

const chatbotClose = () => {
  var chatbot = document.querySelector("#chatbot");
  botBtn.dataset.form = "false";
  chatbot.style.display = "none";
};

const alertClose = () => {
  var alert = document.querySelector("#alert");
  alert.style.display = "none";
};

cBtn.addEventListener("click", courseForm);
eBtn.addEventListener("click", examForm);
aBtn.addEventListener("click", assignForm);
botBtn.addEventListener("click", chatbotOpen);
botBtn02.addEventListener("click", chatbotOpen);
closeBot.addEventListener("click", chatbotClose);
alertBtn.addEventListener("click", alertClose);

// var askBtn = document.querySelector("#askBtn");

// const askBot = () => {
//     console.log("Ss");
// }

// askBtn.addEventListener("click", askBot)
function handleKeyPress(event) {
  // Check if the key pressed is Enter (keyCode 13)
  if (event.keyCode === 13) {
    // Get the value of the input field
    const inputValue = document.getElementById("userInput").value;
    var container = document.createElement("div");
    container.className = "flex flex-col items-end";
    var textContain = document.createElement("div");
    textContain.className =
      "bg-blue rounded-md flex flex-col justify-center items-center gap-y-2 py-4 px-4 shadow-lg shadow-lightBlue text-white";
    container.append(textContain);
    var p = document.createElement("p");
    textContain.append(p);
    p.innerText = inputValue;
    console.log(container);
    sendMessage();
    document.querySelector("#chat").append(container);
    document.getElementById("userInput").value = "";
  }
}

function greet(name) {
  console.log(name);
}

module.exports = {
  greet: greet,
};

async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const message = inputField.value;
  inputField.value = ""; // Clear the input field

  // Display user message
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML += `<div>User: ${message}</div>`;

  // Send the message to the server
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  // Display AI response
  if (data.reply) {
    chatContainer.innerHTML += `<div>AI: ${data.reply}</div>`;
  } else {
    chatContainer.innerHTML += `<div>Error getting response</div>`;
  }

  // Scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
