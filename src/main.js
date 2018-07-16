let welcomePage = document.getElementById('welcome-page');
let buttonHome = document.getElementById('button-home');
let cohortsPage = document.getElementById('cohorts-page');
let countriesSelect = document.getElementById('countries');
let cohortsSelect = document.getElementById('cohorts');
let contHeader = document.getElementById('cont-header');
let studentTable = document.getElementById('student-table');
let searchStudent = document.getElementById('search');
let orderBy = document.getElementById('order-by');
let orderDirection = document.getElementById('order-direction');
let tableStudent = document.getElementById('student-table');

buttonHome.addEventListener('click', () => {
  welcomePage.style.display = "none";
  document.body.style.backgroundColor = '#dcdfe5';
  document.body.style.backgroundImage = "none";
  contHeader.style.display = "block";
  cohortsPage.style.display = "block";
  
})
const options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null
  },
  orderBy: '',
  orderDirection: '',
  search: ''
}
getData = (arrSedes) => {
  let template = '';
  template +=
    `<tr>                                                  
    <th> Nombre </th>                                  
    <th> % Total </th>
    <th> % Ejercicios </th>
    <th> % Quizzes </th>
    <th> Puntaje quizzes </th>
    <th> Promedio quizzes </th>
    <th> % Lecturas </th>
    </tr>`;
  arrSedes.forEach(students => {
    if (students.role === "student") {
      template +=
        `<tr>
        <td id= "studentsTable">${students.name}</td>
        <td>${students.stats.percent}</td> 
        <td>${students.stats.exercises.percent}</td>
        <td>${students.stats.quizzes.percent}</td>
        <td>${students.stats.quizzes.scoreSum}</td>
        <td>${students.stats.quizzes.scoreAvg}</td>
        <td>${students.stats.reads.percent}</td>
        </tr>`;
    }
  })
  return template;
}
countriesSelect.addEventListener('change', () => {
  fetch('../data/cohorts.json')
    .then(response => response.json())
    .then(myCohorts => {
      let template = '';
      for (nameCohort of myCohorts) {
        const usersCohort = nameCohort.id;
        const cohortSplit = usersCohort.split('-');
        if (cohortSplit[0] === countriesSelect.value) {
          template +=
            `<option value =${usersCohort}>${usersCohort}</option>`;
        }
      }
      cohortsSelect.innerHTML = template;
    })
})
cohortsSelect.addEventListener('change', () => {
  fetch('../data/cohorts.json')
    .then(response => response.json())
    .then(selectedCohort => {
      selectedCohort.forEach(objCohorSelect => {
        if (objCohorSelect.id === cohortsSelect.value) {
          options.cohort = objCohorSelect;
        };
      });
    })
  fetch(`../data/cohorts/${cohortsSelect.value}/users.json`)
    .then(response => response.json())
    .then(arrUsers => {
      fetch(`../data/cohorts/${cohortsSelect.value}/progress.json`)
        .then(response => response.json())
        .then(objProgress => {
          options.cohortData.users = arrUsers;
          options.cohortData.progress = objProgress;
          let usersWithStats = processCohortData(options);
          tableStudent.innerHTML = getData(usersWithStats);
        })
    })
})
searchStudent.addEventListener('keyup', () => {
  options.search = searchStudent.value;
  let usersWithStats = processCohortData(options);
  tableStudent.innerHTML = getData(usersWithStats);
})
orderBy.addEventListener('change', () => {
  options.orderBy = orderBy.value;
  let usersWithStats = processCohortData(options);
  tableStudent.innerHTML = getData(usersWithStats);
})
orderDirection.addEventListener('change', () => {
  options.orderDirection = orderDirection.value;
  let usersWithStats = processCohortData(options);
  tableStudent.innerHTML = getData(usersWithStats);
})
