const header = document.getElementById("header");
const laboratoriapage = document.getElementById("start");
const buttonDirectory = document.getElementById("directory");
const studentPage = document.getElementById("studentPage");
const cohortsPage = document.getElementById("cohortsPage");
const sedesCohort = document.getElementById("sedesCohort");
const studentcohort = document.getElementById("studentcohort");
const cohort1 = document.getElementById("cohort");

buttonDirectory.addEventListener('click', ()=>{
    studentPage.style.display="block";
    cohortsPage.style.display="block";
    laboratoriapage.style.display="none";
})  

const link1 = '../data/cohorts.json'
const link2 =  '../data/cohorts/lim-2018-03-pre-core-pw/users.json'
const link3 = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json'

const callsLink = []
let user = []
 
let progress = []
let cohort = []




