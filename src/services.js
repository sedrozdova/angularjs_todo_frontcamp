import moment from 'moment';

export default angular.module('todoApp.services', []).factory('todoFactory', () => {
    const tasksList = [
        {
            id: 0,
            text: 'Yesterdays task',
            done: false,
            createdAt: moment().subtract(1, 'days')
        },
        {
            id: 1,
            text: 'Couple of days ago task',
            done: false,
            createdAt: moment().subtract(2, 'days')
        },
        {
            id: 2,
            text: 'A week ago',
            done: true,
            createdAt: moment().subtract(7, 'days')
        },
        {
            id: 3,
            text: 'Today task',
            done: false,
            createdAt: moment()
        },
    ];

    return {
        getTasks() {
            return tasksList;
        },
        getFilteredTasks(minutesDiff) {
            return tasksList.filter(item => {
                return moment().diff(moment.unix(item.createdAt), 'minutes') < minutesDiff;
            });
        },
        getCompletedTasks() {
            return tasksList.filter(item => item.done);
        },
        getNewTasks() {
            return tasksList.filter(item => !item.done);
        },
        addTodo(todo) {
            tasksList.push(todo);
        },
        changeTodoTitle: function(todoId, newTitle) {
            let index = tasksList.findIndex(elem => elem.id === todoId);
            tasksList[index].text = newTitle;
        },
        completeTask(task) {
            let index = tasksList.findIndex((el) => el === task);
            tasksList[index].done = !tasksList[index].done;
        },
    };
});
