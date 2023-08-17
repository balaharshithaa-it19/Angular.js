angular
    .module('movieApp')
    .service('movieDataService', movieDataService)

movieDataService.$inject = ['$http'];

function movieDataService($http) {
    this.getMoviesData = function () {
        return $http.get('http://localhost:8082/movie/get');
    }  
    
    this.deleteMovie = function(movieId) {
        return $http.delete("http://localhost:8082/movie/delete/"+movieId);
    }

    this.upsertMovie = function(data) {
        return $http.post("http://localhost:8082/movie/add", JSON.stringify(data));
    }
}
