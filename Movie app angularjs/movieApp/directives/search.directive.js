angular
    .module('movieApp')
    .directive('search', search)

function search() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'movieApp/directives/search.directive.html',
        scope: {
            searchId: '@',
            searchName: '@',
            searchFunction:'&',
            searchData: '='
        },
        controller: function($scope) {
            $scope.search = function() {
                $scope.searchData = $scope.searchInput;
                $scope.searchFunction();
            };            
        }
    }
}