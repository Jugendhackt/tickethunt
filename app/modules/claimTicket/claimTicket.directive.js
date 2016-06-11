angular.module('claimTickethunt', ['ui-notification'])

.directive('claim',  function() {
    return {
        restrict: 'E',
        templateUrl: "../app/modules/claimTicket/template.html",
        controller: function(Notification ,$scope){
            $scope.claimed = function(){
                Notification.primary('You claimed this ticket');
                
            }
        }
    };
})
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    });