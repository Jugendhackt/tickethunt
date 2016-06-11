angular.module('tickethunt', ['ngAnimate','mapTickethunt', 'claimTickethunt'])

.controller('mainCtrl', ['$scope', function($scope) {
    $scope.welcome = true;
    $scope.site = false;

}]);