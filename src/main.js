
let welcomePage = document.getElementById('welcome-page');
let buttonHome = document.getElementById('button-home');
let headerLog = document.getElementsByClassName('header');
let cohortsPage = document.getElementById('cohorts-page');
let countriesSelect = document.getElementById('countries');
let cohortsSelect = document.getElementById('cohorts-select');
let contHeader = document.getElementById('cont-header');
let dataSection = document.getElementById('data');
let nameUsers = document.getElementById('nameUser');
let searchs = document.getElementById('search');
let orderBys = document.getElementById('orderBy');
let orderDirection= document.getElementById('order-direction')

buttonHome.addEventListener('click', () => {
  welcomePage.style.display = "none";
  document.body.style.backgroundColor = '#dcdfe5';
  document.body.style.backgroundImage = "none";
  contHeader.style.display = "block";
  cohortsPage.style.display = "block";
  

})

const link1 = '../data/cohorts/cohorts.json'
const link2 = '../data/cohorts/lim-2018-03-pre-core-pw/users.json'
const link3 = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json'
const calls = [];
let cohorts = [];
let progress = [];
let users = [];
console.log(users);
/*
calls.push(fetch(link1));
calls.push(fetch(link1));
calls.push(fetch(link1));

Promise.all(calls)
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
    const optionSede = document.createElement("option");
    optionSede.innerHTML = sedename;
    let countriesattr = document.createAttribute("value");
    countriesattr.value = sedename;
    optionSede.setAttributeNode(countriesattr);
    countries.appendChild(optionSede);
  });
  countriesSelect.addEventListener('change', (evt) => {
    cohortsSelect.innerHTML = "";
    cohorts.forEach(cohort => {
      if ((cohort.id).split('-', 1) == evt.target.value) {
        cohortsSelect.innerHTML += "<option value=\"" + cohort.id + "\">" + cohort.id + "</option>";
        console.log(countriesSelect);
      }
    });
  });
  cohortsSelect.addEventListener('change', (evt) => {
    let value = evt.target.value
    if (value == "lim-2018-03-pre-core-pw") {
      countriesSelect.style.display="none";
      cohortsSelect.style.display = "none";
      let filterUsers = users.filter(user => (user.role == 'student'));
      let selectedCohort = cohorts.find(cohort => (cohort.id == value));
      let options = {
        cohort: selectedCohort,
        cohortData: {
          users: filterUsers,
          progress: progress
        },
        orderBys: "orderByoption",
        orderDirection: 'ASC ',
        search: ''
      }
      let usersWithStats = processCohortData(options);
       let template = '';
      template +=
        '<br><tr>' +
        '<th>Nombre</th>' +
        '<th>% total</th> ' +
        '<th>ejercicios completados</th>' +
        '<th>% de ejercicios</th>' +
        '<th>quizzes completados</th>' +
        '<th>% de quizzes</th>' +
        '<th>lecturas completadas</th>' +
        '<th>% de lecturas</th>'
      '</tr>'
      usersWithStats.forEach(ele => {
        template += '<tr>';
        template += `<td>${ele.name}</td>`
        template += `<td>${ele.stats.percent}</td>`
        template += `<td>${ele.stats.exercises.completed}</td>`
        template += `<td>${ele.stats.exercises.percent}</td>`
        template += `<td>${ele.stats.quizzes.completed}</td>`
        template += `<td>${ele.stats.quizzes.percent}</td>`
        template += `<td>${ele.stats.reads.completed}</td>`
        template += `<td>${ele.stats.reads.percent}</td>`
      })
      dataSection.innerHTML = template;
      searchs.addEventListener('keyup', () => {
        options.search = searchs.value;
        let usersWithStats = processCohortData(options);
        let template = '';
        template +=
        '<br><tr>' +
        '<th>Nombre</th>' +
        '<th>% total</th> ' +
        '<th>ejercicios completados</th>' +
        '<th>% de ejercicios</th>' +
        '<th>quizzes completados</th>' +
        '<th>% de quizzes</th>' +
        '<th>lecturas completadas</th>' +
        '<th>% de lecturas</th>'
      '</tr>'
        usersWithStats.forEach(ele => {
          if (ele.stats) {
            template += '<tr>';
            template += `<td>${ele.name}</td>`
            template += `<td>${ele.stats.percent}</td>`
            template += `<td>${ele.stats.exercises.completed}</td>`
            template += `<td>${ele.stats.exercises.percent}</td>`
            template += `<td>${ele.stats.quizzes.completed}</td>`
            template += `<td>${ele.stats.quizzes.percent}</td>`
            template += `<td>${ele.stats.reads.completed}</td>`
            template += `<td>${ele.stats.reads.percent}</td>`
          }
        })
        dataSection.innerHTML = template;
      })
      orderByu.addEventListener('change', () => {
        orderDirectionu.addEventListener('change', () => {
          options.orderBys = orderBys.value;
          options.orderDirection = orderDirectionu.value;
          let usersWithStats = processCohortData(options);
          let template = '';
          console.log(usersWithStats);
          template +=
          '<br><tr>' +
          '<th>Nombre</th>' +
          '<th>% total</th> ' +
          '<th>ejercicios completados</th>' +
          '<th>% de ejercicios</th>' +
          '<th>quizzes completados</th>' +
          '<th>% de quizzes</th>' +
          '<th>lecturas completadas</th>' +
          '<th>% de lecturas</th>'
        '</tr>'
        usersWithStats.forEach(ele => {
            if (ele.stats) {
              template += '<tr>';
            template += `<td>${ele.name}</td>`
            template += `<td>${ele.stats.percent}</td>`
            template += `<td>${ele.stats.exercises.completed}</td>`
            template += `<td>${ele.stats.exercises.percent}</td>`
            template += `<td>${ele.stats.quizzes.completed}</td>`
            template += `<td>${ele.stats.quizzes.percent}</td>`
            template += `<td>${ele.stats.reads.completed}</td>`
            template += `<td>${ele.stats.reads.percent}</td>`
            }
          })
          dataSection.innerHTML = template;
        })
      })
    }
  });
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
