window.computeUsersStats = (users, progress, courses) => {
    let usersWithStats = users;
    let stats = {
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
};
window.sortUsers = (users, ordeBy, orderDirection) => {
}
window.filterUsers = (users, search) => {
}
window.processCohortData = (options) => {
    let computedUsers = computeUsersStats(options.cohortData.users, options.cohortData.progress, Object.keys(options.cohort.coursesIndex));
    let sortUsers
    let filterUsers
};
