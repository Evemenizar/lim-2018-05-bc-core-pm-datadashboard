const header = document.getElementById("header");
const laboratoriapage = document.getElementById("start");
const buttonDirectory = document.getElementById("directory");
const studentPage = document.getElementById("studentPage");
const select = document.getElementById("cohort");

buttonDirectory.addEventListener('click', ()=>{
    studentPage.style.display="block";
    laboratoriapage.style.display="none";
})  




