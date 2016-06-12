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

                //$scope.ticket.location = {latitude=null,longitude = null};
                $scope.ticket.location = {};

                $scope.fillCoords = function (position) {
                    //{"location":"POINT(48.4235634 9.9570486)",
                    

                    alert (position.coords.latitude);
                    alert($scope.ticket.location);

                    $scope.ticket.location.latitude = position.coords.latitude;
                    $scope.ticket.location.longitude = position.coords.longitude;

                    
                }

                $scope.submitTicket = function () {
                    var finalTicket = $scope.ticket;

                    finalTicket.location = "POINT(" + $scope.ticket.location.latitude + " " + $scope.ticket.location.longitude + ")"

                    TicketService.post ($scope.ticket);

                   // alert(JSON.stringify($scope.ticket));
                    //               ticket.location = "POINT(" + document.getElementById("coordsX").value + " " + document.getElementById("coordsY").value + ")";
                    //               ticket.persons = 

                    alert("Submitted !" + document.getElementById("coordsX").value + "|" + document.getElementById("coordsY").value);
                }
            }
        };

    }]);