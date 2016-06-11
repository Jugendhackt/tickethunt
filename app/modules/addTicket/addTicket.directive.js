angular.module('addTicketTickethunt',[])

.directive('addTicket', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/addTicket/addTicket.html",
        controller: function ($scope) {
            $scope.getLocation = function () {
                 if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else { 
                  x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }

            $scope.submitTicket = function () {
                alert ("Submitted !");
            }
        }
    };

});