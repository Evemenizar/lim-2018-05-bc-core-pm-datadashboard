window.computeUsersStats = (users, progress, courses) => {
    let usersWithStats = users;
    let stats = {};
    usersWithStats.forEach(user => {
        stats = {
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
            }
        }
        const userprogress = progress[user.id];
        const userCourse = userprogress[courses];
        if (userCourse) {
            let percentTotal = userCourse.percent;
            let exercisesTotal = 0;
            let exercisesCompleted = 0;
            let quizzesTotal = 0;
            let quizzesCompleted = 0;
            let quizzesScoreSum = 0;
            let readsTotal = 0;
            let readsCompleted = 0;
            const units = userCourse.units
            Object.values(units).forEach(unit => {
                Object.values(unit.parts).forEach(part => {
                    if (part.type === 'practice' && part.hasOwnProperty('exercises')) {
                        Object.values(part.exercises).forEach((exercise) => {
                            exercisesTotal = exercisesTotal + 1;
                            exercisesCompleted = exercisesCompleted + part.completed
                        })
                    }
                    else if (part.type === 'read') {
                        readsTotal = readsTotal + 1;
                        readsCompleted = readsCompleted + part.completed;
                    }
                    else  if (part.type === 'quiz') {
                        quizzesTotal += 1;
                        if (part.completed == 1) {
                            quizzesCompleted += 1;
                            quizzesScoreSum += part.score;
                        }
                    }
                });
            });
            stats.percent = percentTotal;
            stats.exercises.completed = exercisesCompleted;
            stats.exercises.percent = Math.round(exercisesCompleted / exercisesTotal * 100);
            stats.exercises.total = exercisesTotal;
            stats.quizzes.completed = quizzesCompleted;
            stats.quizzes.percent = Math.round(quizzesCompleted / quizzesTotal * 100);
            stats.quizzes.total = quizzesTotal;
            stats.quizzes.scoreSum = quizzesScoreSum;
            stats.quizzes.scoreAvg = Math.round(quizzesScoreSum / quizzesCompleted);
            stats.reads.completed = readsCompleted;
            stats.reads.percent = Math.round(readsCompleted / readsTotal * 100);
            stats.reads.total = readsTotal;
        }
        user.stats = stats;
    });
    return usersWithStats;
}
window.sortUsers = (users, orderBy, orderDirection) => {
    users.sort((a, b) => {
        if (orderBy === "name") {
            if (orderDirection === "ASC") {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (a.name.toLowerCase()  < b.name.toLowerCase()) {
                    return -1;
                }
            }
            else if (orderDirection === "DESC") {
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() < a.name.toLowerCase()) {
                    return -1;
                }
            }
        }
        if (orderBy === "percent") {
            if (orderDirection === "ASC") {
                if (a.stats.percent > b.stats.percent) {
                    return 1;
                }
                if (a.stats.percent < b.stats.percent) {
                    return -1;
                }
            }
            else if (orderDirection === "DESC") {
                if (b.stats.percent > a.stats.percent) {
                    return 1;
                }
                if (b.stats.percent < a.stats.percent) {
                    return -1;
                }
            }
        }
        if (orderBy === "completedexercises") {
            if (orderDirection === "ASC") {
                if (a.stats.exercises.completed > b.stats.exercises.completed) {
                    return 1;
                }
                if (a.stats.exercises.completed < b.stats.exercises.completed) {
                    return -1;
                }
            }
            else if (orderDirection === "DESC") {
                if (b.stats.exercises.completed > a.stats.exercises.completed) {
                    return 1;
                }
                if (b.stats.exercises.completed  <  a.stats.exercises.completed) {
                    return -1;
                }
            }
        }
        if (orderBy === "completedquizzes") {
            if (orderDirection === "ASC") {
                if (a.stats.quizzes.completed > b.stats.quizzes.completed) {
                    return 1;
                }
                if (a.stats.quizzes.completed  < b.stats.quizzes.completed) {
                    return -1;
                }
            }
            else if (orderDirection === "DESC") {
                if (b.stats.quizzes.completed > a.stats.quizzes.completed) {
                    return 1;
                }
                if (b.stats.quizzes.completed < a.stats.quizzes.completed) {
                    return -1;
                }
            }
        }
        if (orderBy === "scorequizzes") {
            if (orderDirection === "ASC") {
                if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) {
                    return 1;
                }
                if (a.stats.quizzes.scoreAvg  < b.stats.quizzes.scoreAvg) {
                    return -1;
                }
            }
            else if (orderDirection === "DESC") {
                if (b.stats.quizzes.scoreAvg > a.stats.quizzes.scoreAvg) {
                    return 1;
                }
                if (b.stats.quizzes.scoreAvg < a.stats.quizzes.scoreAvg) {
                    return -1;
                }
            }
        }
        if (orderBy === "completedreads") {
            if (orderDirection === "ASC") {
                if (a.stats.reads.completed > b.stats.reads.completed) {
                    return 1;
                }
                if (a.stats.reads.completed < b.stats.reads.completed) {
                    return -1;
                }
            }
            else if (orderDirection === "DESC") {
                if (b.stats.reads.completed > a.stats.reads.completed) {
                    return 1;
                }
                if (b.stats.reads.completed  <  a.stats.reads.completed) {
                    return -1;
                }
            }
        }
        
    })

    return users
};
window.filterUsers = (users, search) => {
    if (search) {
        if (users) {
            search = search.toLowerCase();
            return users.filter(user => user && user.name && user.name.toLowerCase().indexOf(search) >= 0);
        }
    }
    return users;
}


window.processCohortData = (options) => {
    let computedUsers = computeUsersStats(options.cohortData.users, options.cohortData.progress, Object.keys(options.cohort.coursesIndex));
    let filter = filterUsers(computedUsers, options.search);
    let usersSort = sortUsers(filter, options.orderBy, options.orderDirection)
    return usersSort
}
