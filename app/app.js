
angular.module('tickethunt', ['ngAnimate','ngMaterial','mapTickethunt','addTicketTickethunt', 'claimTickethunt','ngResource'])

.controller('mainCtrl', ['$scope', function($scope, pathhelper) {
    $scope.welcome = true;
    $scope.HansPeter= false;

}])

.factory('TicketService', ['$resource', function ($resource) {
    "use strict";

    return $resource(
        'https://tmp.pajowu.de/api/ticket/:id?format=json&:location&:ticket_type&:min_valid',
        {
            id: "@id",//ID of the Tickets
            //location: "@min_lat,@max_lat,@min_lon,@max_lon",//Bounding Box search
            ticket_type: "@type",//Type of the Tickets, get avaible types from 'TicketType'
            min_valid: "@min_valid"//minimal remaining validity time, in minutes
        },{
           get: {method: 'GET', isArray: true},
            delete: {method: 'DELETE'},
            post: {method: 'POST'}
        }

)}])
.factory('TicketTypeService', ['$resource', function ($resource) {
    "use strict";

    return $resource(
        'https://tmp.pajowu.de/api/tickettype/:id?format=json&:search',
        {
            id: "@id",//ID of the Ticket-Type
            search: "@query" //Search Ticket-Type by names and show_name
        },{
            get: {method: 'GET'},
            post: {method: 'POST'}
        }
)}]);
