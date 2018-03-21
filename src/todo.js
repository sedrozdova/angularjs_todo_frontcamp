import 'angular';
import 'angular-route';
import moment from 'moment';
import uuid from 'uuid';

import './index.scss';

const app = angular.module('todoApp', ['ngRoute']);

app.filter('customDate', function() {
    return function(d) {
        return moment(d).format('DD/MM/YYYY hh:mm');
    };
});

app.directive('min20symbols', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.lengthCheck = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if (viewValue.length < 20) {
                    return false;
                }
                return true;
            };
        }
    };
});

app.factory('todoFactory', () => {
    const tasksList = [
        {
            id: 0,
            text: 'Yesterdays\' task',
            done: false,
            createdAt: moment().subtract(1, 'days')
        },
        {
            id: 1,
            text: 'A week ago',
            done: true,
            createdAt: moment().subtract(7, 'days')
        },
        {
            id: 2,
            text: 'Today\'s task',
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
        completeTask(task) {
            let index = tasksList.findIndex((el) => el === task);
            tasksList[index].done = !tasksList[index].done;
        }
    };
});

app.controller('todoController', ['$scope', 'todoFactory', ($scope, todoFactory) => {
    $scope.completedTasks = todoFactory.getCompletedTasks();
    $scope.newTasks = todoFactory.getNewTasks();
    $scope.newTodo = '';
    $scope.filter = -1;
    $scope.textFilter = '';

    $scope.addTodo = () => {
        console.log($scope.newTodo);
        let todo = {
            text: $scope.newTodo,
            id: uuid.v1(),
            done: false,
            createdAt: moment()
        };

        if(!todo.text) {
            alert('Text of todo is mandatory...');
            return;
        }

        todoFactory.addTodo(todo);
        $scope.newTodo = '';
        $scope.completedTasks = todoFactory.getCompletedTasks();
        $scope.newTasks = todoFactory.getNewTasks();
    };

    $scope.completeTask = (task) => {
        todoFactory.completeTask(task);
        $scope.completedTasks = todoFactory.getCompletedTasks();
        $scope.newTasks = todoFactory.getNewTasks();
    };

    $scope.dateFilter = task => {
        if($scope.filter === -1) return true;
        return Math.abs(moment(task.createdAt).diff(moment(), 'days')) <= $scope.filter;
    };

    $scope.dateFilter = task => {
        if($scope.textFilter.length === 0) return true;
        return task.text.toLowerCase().indexOf($scope.textFilter.toLowerCase()) > -1;
    };

    $scope.changeFilter = filter => {
        $scope.filter = filter;
    };

}]);
