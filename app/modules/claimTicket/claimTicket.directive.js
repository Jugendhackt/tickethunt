angular.module('tickethunt', [])

.directive('site',  function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/claimTicket/template.html",
        controller: function($scope){
            $scope.claimed = function(){
                alert ("fuba")
            }
        }
    };
});
/*
angular.module('notificationTest', ['ui-notification'])
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'left',
            positionY: 'top'
        });
    });
    */