angular
    .module('movieApp')
    .directive('sort', sort)

function sort() {
    return {
        restrict: 'E',
        templateUrl: 'movieApp/directives/sort.directive.html',
        scope: {
            sortOptions: '=',
            sortVal: '=',
            ascending: '@',
            descending: '@',
            sortLabel: '@'
        },
        controller: function($scope) {
            $scope.showSortOptionsFlag = false;
            $scope.sortChoice = function(option, choice) {
                choice === $scope.ascending ? $scope.sortVal = option : $scope.sortVal = '-'+option;
                $scope.showSortOptionsFlag = !$scope.showSortOptionsFlag;
            }
        }
    }
}
