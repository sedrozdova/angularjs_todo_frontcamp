import uuid from 'uuid';
import moment from 'moment';

function addEditController($scope, todoFactory, $routeParams, $location) {
    $scope.todoSubmited = false;
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
        $location.url('/');
    };
    $scope.editTodo = function () {
        let newTitle = $scope.newTodo;
        todoFactory.changeTodoTitle($scope.changingTodoId, newTitle);
        $scope.newTodo = '';
        $scope.changingTodoId = '';
        $location.url('/');
    };
}

addEditController.$inject = ['$scope', 'todoFactory', '$routeParams', '$location'];

export { addEditController };
