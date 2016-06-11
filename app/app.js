
angular.module('tickethunt', ['ngAnimate','ngMaterial','mapTickethunt','addTicketTickethunt', 'claimTickethunt'])

.controller('mainCtrl', ['$scope', function($scope, pathhelper) {
    $scope.welcome = true;
    $scope.HansPeter= false;

}])

.factory('TicketService', ['$resource', function ($resource) {
    "use strict";

    return $resource(
        'https://tmp.pajowu.de/api/ticket/:id?format=json&:location',
        {
            id: "@id",
            location: "@min_lat,@max_lat,@min_lon,@max_lon"
        },{
            get: {method: 'GET'},
            delete: {method: 'DELETE'},
            post: {method: 'POST'}
        }


    );




}]);
