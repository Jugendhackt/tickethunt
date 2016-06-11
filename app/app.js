
angular.module('tickethunt', ['ngAnimate','mapTickethunt','addTicketTickethunt', 'claimTickethunt'])

.controller('mainCtrl', ['$scope', function($scope) {
    $scope.welcome = true;
    $scope.site = false;

}]);