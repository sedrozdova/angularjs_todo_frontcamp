import moment from 'moment';

function mainController($scope, todoFactory, $filter, $location) {
    $scope.status = '';
    $scope.newTodoTitle = '';
    $scope.daysOldNumber = null;
    $scope.sortType = '';

    $scope.completeTask = (task) => {
        todoFactory.completeTask(task);
        $scope.completedTasks = todoFactory.getCompletedTasks();
        $scope.newTasks = todoFactory.getNewTasks();
    };
    $scope.activateEditTodo = function (id) {
        console.log('$scope: ', $scope);
        $scope.changingTodoId = id;
        $scope.newTodo = $scope.tasks.find(elem => elem.id === id).text;
        $location.url('/todo/edit/' + id);
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

    $scope.changeTodoSortType = function (type) {
        $scope.sortType = type;
    };
}

mainController.$inject = ['$scope', 'todoFactory', '$filter', '$location'];

export { mainController };
