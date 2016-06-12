angular.module('addTicketTickethunt', [])

    .directive('addTicket', ["TicketService", "TicketTypeService", function (TicketService, TicketTypeService) {
        return {
            restrict: 'E',
            templateUrl: "../app/modules/addTicket/addTicket.html",
            controller: function ($scope) {
                $scope.ticket = {};
                $scope.ticket.location = {};
                $scope.getLocation = function () {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition($scope.fillCoords);
                    } else {
                        alert("Geolocation is not supported by this browser.");
                    }
                }

                $scope.update_ticket_types = function () {
                    TicketTypeService.get()
                    .$promise
                    .then(function(result){
                        $scope.ticket_types = result;
                    });
		}

                $scope.fillCoords = function (position) {
                    alert (position.coords.latitude);
                    alert($scope.ticket.location);

                    $scope.ticket.location.latitude = position.coords.latitude;
                    $scope.ticket.location.longitude = position.coords.longitude;
                }

                $scope.submitTicket = function () {
                    var finalTicket = $scope.ticket;

                    finalTicket.location = "POINT(" + $scope.ticket.location.latitude + " " + $scope.ticket.location.longitude + ")"

                    TicketService.post ($scope.ticket);
                    alert("Submitted !" + document.getElementById("coordsX").value + "|" + document.getElementById("coordsY").value);
                }
                $scope.update_ticket_types();
            }
        };

    }]);
