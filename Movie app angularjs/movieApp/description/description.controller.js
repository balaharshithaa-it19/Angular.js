angular
    .module('movieApp')
    .controller('descriptionController', descriptionController);

descriptionController.$inject = [
    '$scope', 
    '$location', 
    '$route', 
    '$routeParams', 
    'movieDataService'
];

function descriptionController(
    $scope, 
    $location, 
    $route, 
    $routeParams, 
    movieDataService
) {
    function fetchMovieList() {
        movieDataService.getMoviesData()
            .then((moviesData) => {
                const id = Number($routeParams.id);
                moviesData.data.forEach(movie => {
                    if(movie.id === id) {
                        $scope.movieToView = movie;
                    }
                });
            })
            .catch(() => {
                console.error('Error: Fetching of movies unsuccessful');
            });
    }

    function deleteSelectedMovie(movieId) {
        movieDataService.deleteMovie(movieId)
            .then(() => {
                alert("Successfully Deleted");
                ($location.path() === '/') ? $route.reload() : $location.path('/');
            })
            .catch(() => {
                console.error('Error: Movie deletion unsuccessful');
            });
    }

    $scope.deleteMovieConfirmation = function(movieId) {
        if(confirm("Are you sure to delete the movie?")) {
            deleteSelectedMovie(movieId);
        }
    };

    fetchMovieList();
}
