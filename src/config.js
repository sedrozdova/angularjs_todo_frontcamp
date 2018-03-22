export default function($routeProvider, $locationProvider) {
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
};
