const welcomePage = document.getElementById('welcome-page');
const buttonHome = document.getElementById('button-home');
const menuPage = document.getElementById('menu-page');
const cohortsPage = document.getElementById('cohorts-page');
const buttonCohorts = document.getElementById('button-cohorts');
const countriesSelect = document.getElementById("countries");
const cohortsSelect = document.getElementById("cohorts-select");
const dataSection = document.getElementById('data');
buttonHome.addEventListener('click', () => {
  menuPage.style.display = 'block';
  welcomePage.style.display = 'none';
  document.body.style.backgroundColor = 'rgba(150, 159, 170, 0.28)';
  document.body.style.backgroundImage = 'none';
})
buttonCohorts.addEventListener('click', () => {
  menuPage.style.display = 'none';
  cohortsPage.style.display = 'block';
})
const datafile1 = '../data/cohorts.json'
const datafile2 = '../data/cohorts/lim-2018-03-pre-core-pw/users.json'
const datafile3 = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json'
const llamadas = [];
let cohorts = [];
let progress = [];
let users = [];
llamadas.push(fetch(datafile1));
llamadas.push(fetch(datafile2));
llamadas.push(fetch(datafile3));
Promise.all(llamadas)
  .then(
    response => Promise.all(
      response.map(
        data => data.text()
      )
    )
  )
  .then(
    response => {
      cohorts = JSON.parse(response[0])
      users = JSON.parse(response[1])
      progress = JSON.parse(response[2])
      SelectSedesCohorts();
    }
  );
const SelectSedesCohorts = () => {
  const sedes = [];
  cohorts.forEach(cohort => {
    const sedename = (cohort.id).split('-', 1)[0];
    if (sedes.indexOf(sedename) < 0) {
      sedes.push(sedename);
    }
  });
  sedes.forEach(sedename => {
    const optionSede = document.createElement('OPTION');
    optionSede.innerHTML = sedename;
    let countriesattr = document.createAttribute("value");
    countriesattr.value = sedename;
    optionSede.setAttributeNode(countriesattr);
    countries.appendChild(optionSede);
  });

  countriesSelect.addEventListener('change', (evt) => {
    cohortsSelect.innerHTML = "";
    const selectcohortpreadmision = cohorts.forEach(cohort => {
      if ((cohort.id).split('-', 1) == evt.target.value) {
        cohortsSelect.innerHTML += "<option value=\"" + cohort.id + "\">" + cohort.id + "</option>";
      }
    });
  });
  cohortsSelect.addEventListener('change', (evt) => {
    let value = evt.target.value
    if (value == "lim-2018-03-pre-core-pw") {
      let filterUsers = users.filter(user => (user.role == 'student'));
      let selectedCohort = cohorts.find(cohort => (cohort.id == value));
      let options = {
        cohort: selectedCohort,
        cohortData: {
          users: filterUsers,
          progress: progress
          },
          orderBy :'',
          orderDirection : 'ASC',
          search :''
        
      }
      let usersWithStats = processCohortData(options);
       let template = '';
      console.log(usersWithStats);
      template += '<br><tr>'+
      '<th></th>'+
      '<th>Ejercicios</th> '
      '</tr>'
        template += 
        '<br><tr>'+
          '<th>Nombre</th>'+
          '<th>completados</th> '+   
          '<th>Porcentaje de <br> completitud</th>'
          '</tr>'
      usersWithStats.forEach(ele => {
      template += '<tr>';
      template += `<td>${ele.name}</td>`
      template += `<td>${ele.stats.exercises.completed}</td>`
      template += `<td>${ele.stats.exercises.percent}</td>`
      
      })
      dataSection.innerHTML = template;
    }
    else {
      alert("no hay datos");
    }
  });

}


