window.computeUsersStats = (users, progress, courses) => {
  users.forEach(user => {
    let userId = user.id
    const userProgress = progress[userId];
    courses.forEach(userCourse => {
      if (userProgress.hasOwnProperty(userCourse)) {
        let percentTotal = 0;
        let exercisesTotal = 0;
        let exercisesCompleted = 0;
        let quizzesTotal = 0;
        let quizzesCompleted = 0;
        let quizzesScoreSum = 0;
        let readsTotal = 0;
        let readsCompleted = 0;

        percentTotal += userProgress[userCourse].percent;
        const unitsValues = Object.values(userProgress[userCourse].units);
        unitsValues.forEach(eleUnitsValues => {
          const partsUnits = Object.values(eleUnitsValues.parts);

          partsUnits.forEach(part => {
            if (part.type === 'read') {
              readsTotal++;
              if (part.completed === 1) {
                readsCompleted++;
              }
            }
            if (part.type === 'practice' && part.hasOwnProperty("exercises")) {

              let arrExercisesTotal = Object.keys(part.exercises);
              exercisesTotal += arrExercisesTotal.length;
              exercisesCompleted += part.completed;
            }
            if (part.type === 'quiz') {
              quizzesTotal++;
              if (part.completed === 1 && part.hasOwnProperty("score")) {
                quizzesCompleted++;
                quizzesScoreSum += part.score;
              }
            }
          })
        })
        user.stats = {
          percent: percentTotal,
          exercises: {
            total: exercisesTotal,
            completed: exercisesCompleted,
            percent: Math.round(exercisesCompleted * 100)
          },
          reads: {
            total: readsTotal,
            completed: readsCompleted,
            percent: Math.round(readsCompleted * 100 / readsTotal)
          },
          quizzes: {
            total: quizzesTotal,
            completed: quizzesCompleted,
            percent: Math.round(quizzesCompleted * 100 / quizzesTotal),
            scoreSum: quizzesScoreSum,
            scoreAvg: Math.round(quizzesScoreSum / quizzesTotal)
          },
        }
      } else {
        user.stats = {
          percent: 0,
          exercises: {
            total: 0,
            completed: 0,
            percent: 0
          },
          reads: {
            total: 0,
            completed: 0,
            percent: 0
          },
          quizzes: {
            total: 0,
            completed: 0,
            percent: 0,
            scoreSum: 0,
            scoreAvg: 0
          },
        }
      };
    })
  })
  return users;
}
window.sortUsers = (users, orderBy, orderDirection) => {
  users.sort((x, y) => {
    if (orderBy === "name") {
      if (orderDirection === "ASC") {
        if (x.name.toLowerCase() > y.name.toLowerCase()) {
          return 1;
        }
        if (x.name.toLowerCase() < y.name.toLowerCase()) {
          return -1;
        }
      } else if (orderDirection === "DESC") {
        if (y.name.toLowerCase() > x.name.toLowerCase()) {
          return 1;
        }
        if (y.name.toLowerCase() < x.name.toLowerCase()) {
          return -1;
        }
      }
    }
    if (orderBy === "percent") {
      if (orderDirection === "ASC") {
        if (x.stats.percent > y.stats.percent) {
          return 1;
        }
        if (x.stats.percent < y.stats.percent) {
          return -1;
        }
      } else if (orderDirection === "DESC") {
        if (y.stats.percent > x.stats.percent) {
          return 1;
        }
        if (y.stats.percent < x.stats.percent) {
          return -1;
        }
      }
    }
    if (orderBy === "exercises") {
      if (orderDirection === "ASC") {
        if (x.stats.exercises.completed > y.stats.exercises.completed) {
          return 1;
        }
        if (x.stats.exercises.completed < y.stats.exercises.completed) {
          return -1;
        }
      } else if (orderDirection === "DESC") {
        if (y.stats.exercises.completed > x.stats.exercises.completed) {
          return 1;
        }
        if (y.stats.exercises.completed < x.stats.exercises.completed) {
          return -1;
        }
      }
    }
    if (orderBy === "quizzes") {
      if (orderDirection === "ASC") {
        if (x.stats.quizzes.completed > y.stats.quizzes.completed) {
          return 1;
        }
        if (x.stats.quizzes.completed < y.stats.quizzes.completed) {
          return -1;
        }
      } else if (orderDirection === "DESC") {
        if (y.stats.quizzes.completed > x.stats.quizzes.completed) {
          return 1;
        }
        if (y.stats.quizzes.completed < x.stats.quizzes.completed) {
          return -1;
        }
      }
    }
    if (orderBy === "scoreAvg") {
      if (orderDirection === "ASC") {
        if (x.stats.quizzes.scoreAvg > y.stats.quizzes.scoreAvg) {
          return 1;
        }
        if (x.stats.quizzes.scoreAvg < y.stats.quizzes.scoreAvg) {
          return -1;
        }
      } else if (orderDirection === "DESC") {
        if (y.stats.quizzes.scoreAvg > x.stats.quizzes.scoreAvg) {
          return 1;
        }
        if (y.stats.quizzes.scoreAvg < x.stats.quizzes.scoreAvg) {
          return -1;
        }
      }
    }
    if (orderBy === "reads") {
      if (orderDirection === "ASC") {
        if (x.stats.reads.completed > y.stats.reads.completed) {
          return 1;
        }
        if (x.stats.reads.completed < y.stats.reads.completed) {
          return -1;
        }
      } else if (orderDirection === "DESC") {
        if (y.stats.reads.completed > x.stats.reads.completed) {
          return 1;
        }
        if (y.stats.reads.completed < x.stats.reads.completed) {
          return -1;
        }
      }
    }
  })
  return users
};
window.filterUsers = (users, search) => {
  let userFilter = users;
  search = search.toLowerCase();
  userFilter = users.filter(user => user.name.toLowerCase().indexOf(search) >= 0)
  return userFilter;
}
window.processCohortData = (options) => {
  let coursesCohort = Object.keys(options.cohort.coursesIndex);
  let computedUsers = computeUsersStats(options.cohortData.users, options.cohortData.progress, coursesCohort);
  let usersSorted = sortUsers(computedUsers, options.orderBy, options.orderDirection);
  let userFilter = filterUsers(usersSorted, options.search);
  return userFilter;
}
