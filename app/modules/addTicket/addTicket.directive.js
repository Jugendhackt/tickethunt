angular.module('tickethunt', [])

.directive('site', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/claimTicket/template.html"
    };
});