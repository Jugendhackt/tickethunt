
angular.module('tickethunt', ['ngAnimate','mapTickethunt','addTicketTickethunt', 'claimTickethunt'])

.controller('mainCtrl', ['$scope', function($scope) {
    $scope.welcome = true;
    $scope.site = false;

}])

.factory('TicketService', ['$resource', function ($resource) {
    "use strict";

    return $resource(
        'https://tmp.pajowu.de/api/ticket/:id?format=json&:location&:ticket_type&:min_valid',
        {
            id: "@id",//ID of the Tickets
            location: "@min_lat,@max_lat,@min_lon,@max_lon",//Bounding Box search
            ticket_type: "@type",//Type of the Tickets, get avaible types from 'TicketType'
            min_valid: "@min_valid"//minimal remaining validity time, in minutes
        },{
            get: {method: 'GET'},
            delete: {method: 'DELETE'},
            post: {method: 'POST'}
        }


)
)
/*
.factory('TicketType', ['$resource', function ($resource) {
    "use strict";

    return $resource(
        'https://tmp.pajowu.de/api/tickettype/?format=json&:',
        {
            id: "@id",
        },{
            get: {method: 'GET'},
            post: {method: 'POST'}
        }


)
)*/;
