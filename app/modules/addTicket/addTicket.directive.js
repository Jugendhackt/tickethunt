angular.module('addTicketTickethunt', [])

    .directive('addTicket', ["TicketService", "TicketTypeService", function (TicketService, TicketTypeService) {
        return {
            restrict: 'E',
            templateUrl: "../app/modules/addTicket/addTicket.html",
            controller: function ($scope) {
                $scope.ticket = {};
                $scope.getLocation = function () {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition($scope.fillCoords);
                    } else {
                        alert("Geolocation is not supported by this browser.");
                    }
                }

                $scope.ticket.location = {
                    "type": "Point",
                    "coordinates": [
                        null,
                        null
                    ]
                }



                $scope.fillCoords = function (position) {
                    $scope.ticket.location.coordinates[0] = position.coords.latitude;
                    $scope.ticket.location.coordinates[1] = position.coords.longitude;
                }

                $scope.submitTicket = function () {
                    
                    TicketService.post ($scope.ticket);

                   // alert(JSON.stringify($scope.ticket));
                    //               ticket.location = "POINT(" + document.getElementById("coordsX").value + " " + document.getElementById("coordsY").value + ")";
                    //               ticket.persons = 

                    alert("Submitted !" + document.getElementById("coordsX").value + "|" + document.getElementById("coordsY").value);
                }
            }
        };

    }]);