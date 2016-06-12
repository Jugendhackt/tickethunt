angular.module('addTicketTickethunt', ['ui-notification'])

    .config(function (NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    })

    .directive('addTicket', ["TicketService", "TicketTypeService", "Notification", function (TicketService, TicketTypeService, Notification) {
        return {
            restrict: 'E',
            templateUrl: "../app/modules/addTicket/addTicket.html",
            controller: function ($scope) {
                $scope.ticket = {};
                    $scope.ticket.location = {};

                    $scope.update_ticket_types = function () {
                    TicketTypeService.get()
                    .$promise
                    .then(function(result){
                           $scope.ticket_types = result;
                    });
		}

                $scope.onLoad = function () {

                    const input = document.getElementById("imgUpload");
                    const button = document.getElementById("uploadButton");

                    if (input.length && button.length) {
                        button.click((e) => input.click());
                    }
                };

                $scope.getLocation = function () {
                    if (navigator.geolocation) {
                        if (navigator.geolocation.getCurrentPosition($scope.fillCoords)) {

                        } else {
                        }
                    } else {
                        Notification.error("Geolocation is not supported by this browser.");
                    }
                }

                $scope.ticket.location = {};

                $scope.fillCoords = function (position) {

                    $scope.ticket.location.latitude = position.coords.latitude;
                    $scope.ticket.location.longitude = position.coords.longitude;

                    $scope.$apply();
                    $scope.update_ticket_types = function () {
                        TicketTypeService.get()
                            .$promise
                            .then(function (result) {
                                $scope.ticket_types = result;
                            });
                    }

                    $scope.fillCoords = function (position) {
                        alert(position.coords.latitude);
                        alert($scope.ticket.location);

                        $scope.ticket.location.latitude = position.coords.latitude;
                        $scope.ticket.location.longitude = position.coords.longitude;
                    }

                    $scope.submitTicket = function () {
                        var finalTicket = $scope.ticket;

                        finalTicket.location = "POINT(" + $scope.ticket.location.latitude + " " + $scope.ticket.location.longitude + ")"

                        TicketService.post($scope.ticket);
                        
			HansPeter = !HansPeter;
                        Notification.success("Submitted ticket.");
                        TicketService.post($scope.ticket);
                        alert("Submitted !" + document.getElementById("coordsX").value + "|" + document.getElementById("coordsY").value);
                    }
                    $scope.update_ticket_types();
                };
            }
        };
    }]);

