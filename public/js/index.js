var cBtn = document.querySelector("#courses");
var eBtn = document.querySelector("#exam");
var aBtn = document.querySelector("#assignment");

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

cBtn.addEventListener("click", courseForm)
eBtn.addEventListener("click", examForm)
aBtn.addEventListener("click", assignForm)