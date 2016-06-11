angular.module('tickethunt', [])

.directive('site', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/map/template.html"
    };
});