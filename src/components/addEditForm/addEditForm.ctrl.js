import uuid from 'uuid';
import moment from 'moment';

function addEditController($scope, todoFactory, $routeParams, $location) {
    $scope.completedTasks = todoFactory.getCompletedTasks();
    $scope.newTasks = todoFactory.getNewTasks();
    $scope.changingTodoId = $routeParams.id || '';

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
        console.log('$scope from addEditForm: ', $scope);
        $location.url('/');
    };
    $scope.editTodo = function () {
        console.log('$scope from addEditForm --before: ', $scope);
        let newTitle = $scope.newTodo;
        todoFactory.changeTodoTitle($scope.changingTodoId, newTitle);
        $scope.newTodo = '';
        $scope.changingTodoId = '';
        console.log('$scope from addEditForm --after: ', $scope);
        $location.url('/');
    };
}

addEditController.$inject = ['$scope', 'todoFactory', '$routeParams', '$location'];

export default addEditController;
