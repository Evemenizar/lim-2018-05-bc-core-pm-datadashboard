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
                            quizzesTotals++;
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
    let sortedUsers = users;
    if (orderDirection.length !== 0) {
        sortedUsers = users.sort((one, two) => {
            if (orderBy === "name") {
                let compareName = one.name.compareLocal(two.name);
                return compareName;
            } else if (orderBy === "percent") {
                if (one.stats[orderBy] > two.stats[orderBy]) return 1;
                if (one.stats[orderBy] < two.stats[orderBy]) return -1;
                return 0;
            } else if (orderBy === "exercises" || orderBy === "quizzes" || orderBy === "reads") {
                if (one.stats[orderBy].percent > two.stats[orderBy].percent) return 1;
                if (one.stats[orderBy].percent < two.stats[orderBy].percent) return -1;
                return 0;
            } else if (orderBy === "scoreSum" || orderBy === "scoreAvg") {
                if (one.stats.quizzes[orderBy] > two.stats.quizzes[orderBy]) return 1;
                if (one.stats.quizzes[orderBy] < two.stats.quizzes[orderBy]) return -1;
                return 0;
            }
        })
        if (orderDirection === "DESC") {
            sortedUsers = sortedUsers.reverse();
        }
    }
    return sortedUsers;
}
window.filterUsers = (users, search) => {
    let userFilter = users;
    search = search.toLowerCase();
    userFilter = users.filter(user => user.name.toLowerCase().indexOf(search) >= 0)
    return userFilter;
}
window.processCohortData = (options) => {
    let coursesCohort = Object.keys(options.cohort.coursesIndex);
    let computedUsers = computeUsersStats(options.cohortData.users, options.cohortData.progress, coursesCohort);
    let usersSort = sortUsers(usersStats, options.orderBy, options.orderDirection);
    let userFilter = filterUsers(orderUsers, options.search);
    return userFilter;
}
