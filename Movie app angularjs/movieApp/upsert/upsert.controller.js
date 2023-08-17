angular
    .module('movieApp')
    .controller('upsertController', upsertController);

upsertController.$inject = [
    '$scope', 
    '$location', 
    '$route', 
    '$routeParams', 
    '$filter', 
    'movieDataService'
];

function upsertController(
    $scope, 
    $location, 
    $route, 
    $routeParams, 
    $filter, 
    movieDataService
) {
    $scope.languages = [
        {
            label: 'Tamil',
            isChecked: false,
        },
        {
            label: 'English',
            isChecked: false,
        },
        {
            label: 'Hindi',
            isChecked: false,
        },
        {
            label: 'Telugu',
            isChecked: false,
        },
        {
            label: 'Malayalam',
            isChecked: false,
        },
        {
            label: 'Kannada',
            isChecked: false
        }
    ];

    $scope.verdicts = [
        {
            label: 'Hit',
            isChecked: false,
        }, 
        {
            label: 'Flop',
            isChecked: false,
        },  
        {
            label: 'Average',
            isChecked: false
        }
    ];

    $scope.genres = [
        {
            label: 'Romance',
            isChecked: false,
        }, 
        {
            label: 'Drama',
            isChecked: false,
        },  
        {
            label: 'Sci-Fi',
            isChecked: false,
        },  
        {
            label: 'Action',
            isChecked: false,
        },  
        {
            label: 'Adventure',
            isChecked: false,
        },  
        {
            label: 'Fantasy',
            isChecked: false
        },  
        {
            label: 'Horror',
            isChecked: false
        },  
        {
            label: 'Thriller',
            isChecked: false
        }
    ];

    $scope.checkFirst = {
        languageCheckFirst: true,
        genreCheckFirst: true
    };

    $scope.verdictInfo = {
        selected: "none"
    };

    $scope.getCheckedList = function(objArray) {
        var checkedList = [];
        objArray.forEach(obj => {
            if(obj.isChecked === true) {
                checkedList.push(obj.label);
            }
        });
        return checkedList
    };

    $scope.fillSelected = function(stringList, objArray) {
        selectedList= stringList.split(", ")
        selectedList.forEach(item => {
            objArray.forEach(obj => {
                if(obj.label === item) {
                    obj.isChecked = !obj.isChecked
                }
            });
        });
    };

    $scope.action = $routeParams.action;

    $scope.flagAdd = 0;

    function upsertForm(action) {
        if(action === 'edit') {
            movieDataService.getMoviesData()
                .then((moviesData) => {
                    const id = Number($routeParams.id);
                    moviesData.data.forEach(movie => {
                        if(movie.id === id){
                            $scope.name = movie.name;
                            $scope.genre = $scope.fillSelected(movie.genre, $scope.genres);
                            $scope.releaseDate = new Date(movie.releaseDate);
                            $scope.rating = movie.rating;
                            $scope.language = $scope.fillSelected(movie.language, $scope.languages);
                            $scope.verdictInfo.selected = movie.verdictInfo;
                            $scope.movieDescription = movie.movieDescription;
                        }
                    });
                })
                .catch(() => {
                    console.error('Error: Unable to fetch data');
                });
        }
    }

    function upsert(action) {
        movieDataService.upsertMovie(data)
            .then(() => {
                if(action === 'edit'){
                    alert("Successfully Updated");
                    $location.url('/');
                } else if(action === 'add') {
                    alert("Successfully added the Movie");
                    if($scope.flagAdd === 0) {
                        $location.path('/');
                    } else if($scope.flagAdd === 1) {
                        $location.path('/movie/add');
                        $route.reload();
                    }
                }
                
            })
            .catch(() => {
                console.error('Error: upserton failed');
            });
    }

    $scope.addAnother = function() {
        $scope.flagAdd = 1;
    };

    $scope.submit = function(action) {
        data = {
            'name': $scope.name,
            'genre': $scope.getCheckedList($scope.genres).join(", "),
            'releaseDate': $filter('date')($scope.releaseDate, 'yyyy-MM-dd'),
            'rating': $scope.rating,
            'language':  $scope.getCheckedList($scope.languages).join(", "),
            'verdictInfo': $scope.verdictInfo.selected,
            'movieDescription':$scope.movieDescription
        }

        if(action === 'edit') {   
            data.id = $routeParams.id;
            if(confirm("Are you sure to make the changes to the movie \""+$scope.name+ "\" details. The changes made cannot be revoked once done?")) {
                upsert(action);
            }
        } else if(action === 'add') {
            upsert(action);
        }
    };

    $scope.back = function() {
        window.history.back();
    };

    upsertForm($scope.action);
}