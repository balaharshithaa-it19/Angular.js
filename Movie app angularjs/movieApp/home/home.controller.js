angular
    .module('movieApp')
    .controller('homeController', homeController);

homeController.$inject = [
    '$scope', 
    '$route', 
    '$location',
    'movieDataService'
];

function homeController(
    $scope, 
    $route, 
    $location, 
    movieDataService
) {
    $scope.options = [
        {
            label: 'Rating',
            value: 'rating'
        },
        {
            label: 'Name',
            value: 'name'
        },
        {
            label: 'Genre',
            value: 'genre'
        },
        {
            label: 'Release Date',
            value: 'releaseDate'
        },
        {
            label: 'Language',
            value: 'language'
        }
    ];
    
    $scope.sortValue = "";

    $scope.movieToSearch = {
        name: ''
    };

    function fetchMovieList() {
        movieDataService.getMoviesData()
            .then((moviesData) => {
                $scope.movies = moviesData.data;
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

    $scope.searchMovie = function() {
        fetchMovieList();
    };

    fetchMovieList(); 
}




// $scope.options = [{
    //     basedOn: 'rating',
    //     choice1: 'Ascending',
    //     choice2: 'Descending'
    // }, {
    //     basedOn: 'name',
    //     choice1: 'Ascending',
    //     choice2: 'Descending'
    // }, {
    //     basedOn: 'genre',
    //     choice1: 'Ascending',
    //     choice2: 'Descending'
    // }, {
    //     basedOn: 'releaseDate',
    //     choice1: 'Ascending',
    //     choice2: 'Descending'
    // }, {
    //     basedOn: 'language',
    //     choice1: 'Ascending',
    //     choice2: 'Descending'
    // }];
    // $scope.options = [
    //     'rating',
    //     'name', 
    //     'genre', 
    //     'releaseDate', 
    //     'language'
    // ];
    