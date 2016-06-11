angular.module('addTicketTickethunt',[])

.directive('addTicket', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/addTicket/addTicket.html",
        controller: function ($scope) {
            $scope.getLocation = function () {
                 if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition($scope.fillCoords);
                } else { 
                 alert ("Geolocation is not supported by this browser.");
                }
            }

            $scope.fillCoords = function (position) {
                var x = document.getElementById("coordsX");
                var y = document.getElementById("coordsY");

                x.value = position.coords.latitude;
                y.value = position.coords.longitude;
            }

            $scope.submitTicket = function () {
                alert ("Submitted !");
            }
        }
    };

});