angular.module('tickethunt', ['ngAnimate','mapTickethunt'])

.controller('mainCtrl', ['$scope', function($scope) {
    $scope.welcome = true;
    $scope.site = false;

    $scope.change = function() {
        $scope.welcome = !$scope.welcome;
        $scope.site = !$scope.site;
    }
}]);