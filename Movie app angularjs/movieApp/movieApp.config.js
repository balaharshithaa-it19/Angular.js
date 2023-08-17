angular
    .module('movieApp')
    .config(config)

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'movieApp/home/home.html',
            controller: 'homeController'
        })
        .when('/movieDescription/:id', {
            templateUrl: 'movieApp/description/description.html',
            controller: 'descriptionController'
        })
        .when('/movie/:action/:id?  ', {
            templateUrl: 'movieApp/upsert/upsert.html',
            controller: 'upsertController'
        })
        .otherwise({
            redirectTo() {
                alert("The requested page is not available. You will be re-directed to the list of movies page.");
                return '/';
            }
        })
}