fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
.then(function(response) {
  if(response.ok) {
    response.json()
.then(function(json) {
      user = json;
      cohorts();
    });
  } else {
    console.log('error');
  }
});
const cohorts = () => {
  for (let i = 0; i < user.length; i++) {
    const options = document.createElement('option');
    const contentoption = document.createTextNode(user[i].name);
   options.appendChild(contentoption);
   console.log(user[i].id);
     select.appendChild(options);
     }
const resul = resuls [i];
     if(resul.id=== "00hJv4mzvqM3D9kBy3dfxoJyFV82") {
       return resul;
      }



}



const buttonWelcome = document.getElementById("buttonhome");
const laboratoriapage=document.getElementById("start");
const welcomePage=document.getElementById("welcomepage");
const buttonpreadmisio=document.getElementById("students")
const studentsPge=document.getElementById("studentspage")
buttonWelcome.addEventListener('click', ()=>{
    laboratoriapage.style.display="block";
    welcomePage.style.display="none";
})
buttonpreadmisio.addEventListener('click',()=>{
    studentsPge.style.display="block";
    laboratoriapage.style.display="none";
})
const select = document.getElementById('cohort');
const students = document.getElementById('user');


  
