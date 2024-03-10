var cBtn = document.querySelector("#courses");
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

cBtn.addEventListener("click", courseForm)