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
    let computedUsers = computeUsersStats(options.cohortData.users, options.cohortData.progress, Object.keys(options.cohort.coursesIndex));
    let filter = filterUsers(computedUsers, options.search);
    let usersSort = sortUsers(filter, options.orderBy, options.orderDirection)
    return usersSort
}
