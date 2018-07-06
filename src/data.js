window.computeUsersStats = (users, progress, courses) => {
    let usersWithStats = users;
    let stats = {};
    const courseName = 'intro';
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
                percent: 0
            }
        }
        const courses= progress[user.id];
        const userCourse = courses[courseName];
        if (userCourse) {
            let exercisesTotal = 0;
            let exercisesCompleted = 0;
            let quizzesTotal = 0 ;
            let quizzesCompleted = 0 ;
            const units = userCourse.units;
            Object.keys(units).forEach((unitName) => {
                const parts = units[unitName].parts;
                Object.keys(parts).forEach((partName) => {
                    const exercises = parts[partName].exercises;
                    exercises && Object.keys(exercises).forEach((exName) => {
                        const ex = exercises[exName];
                        exercisesTotal = exercisesTotal + 1;
                        exercisesCompleted = exercisesCompleted + ex.completed;
                    }) ;
                    const quiz = parts[partName].quiz;
                   quiz && Object.keys(quiz).forEach((quiName ) => {
                        const qui = quiz[quiz === "quiz"];
                      quizzesTotal = quizzesTotal + 1;
                      quizzesCompleted = quizzesCompleted + qui.completed;
                    })     
                })
            })
            stats.exercises.completed = exercisesCompleted;
            stats.exercises.percent =(exercisesCompleted / exercisesTotal)  * 100;
            stats.exercises.total = exercisesTotal;
            stats.quizzes.completed = quizzesCompleted;
            stats.quizzes.percent = quizzesCompleted / quizzesTotal * 100;
            stats.quizzes.total = quizzesTotal;
          
        }
        user.stats = stats;

    });
    return usersWithStats;
}
window.sortUsers = (users, ordeBy, orderDirection) => {
}
window.filterUsers = (users, search) => {

}
window.processCohortData = (options) => {
    let computedUsers = computeUsersStats(options.cohortData.users, options.cohortData.progress, Object.keys(options.cohort.coursesIndex));
    // let sortUsers = sortUsers(computedUsers , options.orderBy , options.orderDirection);
    // let filterUsers = filterUsers(sortUsers , options.search);
    return computedUsers;
}
