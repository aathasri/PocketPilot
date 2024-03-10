var cBtn = document.querySelector("#courses");
var eBtn = document.querySelector("#exam");
var aBtn = document.querySelector("#assignment");
var botBtn = document.querySelector("#botBtn");
var botBtn02 = document.querySelector("#botBtn02");
var closeBot = document.querySelector("#closeBot");
var alertBtn = document.querySelector("#alertClose");

const courseForm = () => {
    var cForm  = document.querySelector("#cForm");
    var cOpen = cForm.dataset.form;
    console.log(cOpen);
    if(cOpen=="true"){
        cForm.dataset.form = false;
        cForm.style.display = "none";
    }else{
        cForm.dataset.form = true;
        cForm.style.display = "block";
    }
}
const examForm = () => {
    var eForm  = document.querySelector("#eForm");
    var eOpen = eForm.dataset.form;
    console.log(eOpen);
    if(eOpen=="true"){
        eForm.dataset.form = false;
        eForm.style.display = "none";
    }else{
        eForm.dataset.form = true;
        eForm.style.display = "block";
    }
}
const assignForm = () => {
    var aForm  = document.querySelector("#aForm");
    var aOpen = aForm.dataset.form;
    console.log(aOpen);
    if(aOpen=="true"){
        aForm.dataset.form = false;
        aForm.style.display = "none";
    }else{
        aForm.dataset.form = true;
        aForm.style.display = "block";
    }
}

const chatbotOpen = () => {
    var chatbot  = document.querySelector("#chatbot");
    var botOpen = chatbot.dataset.form;
    console.log(botOpen);
    if(botOpen=="true"){
        chatbot.dataset.form = false;
        chatbot.style.display = "none";
    }else{
        chatbot.dataset.form = true;
        chatbot.style.display = "block";
    }
}

const chatbotClose = () => {
    var chatbot  = document.querySelector("#chatbot");
    chatbot.dataset.form = false;
    chatbot.style.display = "none";
}

const alertClose = () => {
    var alert  = document.querySelector("#alert");
    alert.style.display = "none";
}

cBtn.addEventListener("click", courseForm)
eBtn.addEventListener("click", examForm)
aBtn.addEventListener("click", assignForm)
botBtn.addEventListener("click", chatbotOpen)
botBtn02.addEventListener("click", chatbotOpen)
closeBot.addEventListener("click", chatbotClose)
alertBtn.addEventListener("click", alertClose)