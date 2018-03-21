import 'angular';
import 'angular-route';
import moment from 'moment';
import uuid from 'uuid';
import { addEditController } from './components/addEditForm/addEditForm.ctrl.js';
import { mainController } from './components/main/main.ctrl.js';

import './index.scss';

const app = angular.module('todoApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './src/components/main/main.tpl.htm',
            controller: 'mainController'
        })
        .when('/todo/add', {
            templateUrl: './src/components/addEditForm/addEditForm.tpl.htm',
            controller: 'addEditController'
        })
        .when('/todo/edit/:id', {
            templateUrl: './src/components/addEditForm/addEditForm.tpl.htm',
            controller: 'addEditController'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
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

app.filter('customDate', function () {
    return function (d) {
        return moment(d).format('DD/MM/YYYY hh:mm');
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
}]);

app.controller('mainController', mainController);
app.controller('addEditController', addEditController);
