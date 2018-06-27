const header = document.getElementById("header");
const laboratoriapage = document.getElementById("start");
const buttonDirectory = document.getElementById("directory");
const studentPage = document.getElementById("studentPage");
const select = document.getElementById("cohort");
const filSede = document.getElementById("filSede");
const filGeneration = document.getElementById("filGeneration");
const filAlphabet = document.getElementById("filAlphabet");

buttonDirectory.addEventListener('click', ()=>{
    studentPage.style.display="block";
    filSede.style.display="block";
    filGeneration.style.display="block";
    filAlphabet.style.display="block";
    laboratoriapage.style.display="none";
})  


