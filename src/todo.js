import 'angular';
import 'angular-route';
import moment from 'moment';
import uuid from 'uuid';

import './index.scss';

const app = angular.module('todoApp', ['ngRoute']);

app.filter('customDate', function () {
    return function (d) {
        return moment(d).format('DD/MM/YYYY hh:mm');
    };
});

app.directive('min20symbols', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            ngModel.$validators.lengthCheck = function (modelValue, viewValue) {
                if (ngModel.$isEmpty(modelValue)) {
                    return true;
                }

                return viewValue.length > 20;
            };
        }
    };
});

app.factory('todoFactory', () => {
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

app.filter('startsWithLetter', function () {
    return function (items, letter) {
        let filtered = [];
        let letterMatch = new RegExp(letter, 'i');
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (letterMatch.test(item.text.substring(0, 1))) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});

app.controller('todoController', ['$scope', 'todoFactory', ($scope, todoFactory) => {
    $scope.completedTasks = todoFactory.getCompletedTasks();
    $scope.tasks = todoFactory.getTasks();
    $scope.newTasks = todoFactory.getNewTasks();
    $scope.newTodo = '';
    $scope.filter = -1;
    $scope.textFilter = '';
    $scope.sortType = '';
    $scope.changingTodoId = '';

    $scope.addTodo = () => {
        let todo = {
            text: $scope.newTodo,
            id: uuid.v1(),
            done: false,
            createdAt: moment()
        };

        if (!todo.text) {
            alert('Text of todo is mandatory...');
            return;
        }

        todoFactory.addTodo(todo);
        $scope.newTodo = '';
        $scope.completedTasks = todoFactory.getCompletedTasks();
        $scope.newTasks = todoFactory.getNewTasks();
    };
    $scope.editTodo = function() {
        let newTitle = $scope.newTodo;
        todoFactory.changeTodoTitle($scope.changingTodoId, newTitle);
        $scope.newTodo = '';
        $scope.changingTodoId = '';
    };
    $scope.completeTask = (task) => {
        todoFactory.completeTask(task);
        $scope.completedTasks = todoFactory.getCompletedTasks();
        $scope.newTasks = todoFactory.getNewTasks();
    };
    $scope.activateEditTodo = function(id) {
        console.log('$scope: ', $scope);
        $scope.changingTodoId = id;
        $scope.newTodo = $scope.tasks.find(elem => elem.id === id).text;
    };

    $scope.dateFilter = task => {
        if ($scope.filter === -1) {
            return true;
        }

        return Math.abs(moment(task.createdAt).diff(moment(), 'days')) <= $scope.filter;
    };

    $scope.changeFilter = filter => {
        $scope.filter = filter;
    };

    $scope.changeTodoSortType = function(type) {
        $scope.sortType = type;
    };

}]);
