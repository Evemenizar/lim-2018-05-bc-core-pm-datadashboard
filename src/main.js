window.computerUsersStats = (user, progress, courses) =>{

  fetch("..\Data-dashboard\lim-2018-05-bc-core-pm-datadashboard\data\cohorts\lim-2018-03-pre-core-pw")
  .then(response =>{
    if(response.status == 200){ 
    }else{
       
    };}, 
    response.json())
  .then(response =>{
    console.log(response)
  })
}

/*
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
  .then(response => {
  const cohort = json;
 
  for (let i = 0; i < cohort.length; i++) {
    const options = document.createElement('option');
    const contentoption = document.createTextNode(cohort[i].name);
    options.appendChild(contentoption);

     select.appendChild(options);   
  }

})   
.catch((err) => {

});

*/