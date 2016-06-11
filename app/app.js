
angular.module('tickethunt', ['ngAnimate','mapTickethunt','addTicketTickethunt', 'claimTickethunt'])

.controller('mainCtrl', ['$scope', function($scope) {
    $scope.welcome = true;
    $scope.site = false;

}])
"http[s]?:\/\/[a-z,A-Z,0-9,.,\/,^(?P=app)]*(?=\/app\/)/"

    .factory('pathhelper', function(){
        return {
            getRootPath: function(){
                var exp = /http[s]?:\/\/[a-z,A-Z,0-9,.,\/,^(?P=app)]*(?=\/app\/)/;
                var arr = window.location.ToString().match(exp);
                return arr[0];
            }
        }
})


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


)
);
