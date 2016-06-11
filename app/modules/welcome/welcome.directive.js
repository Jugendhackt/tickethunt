angular.module('tickethunt-welcome', [])

.directive('welcome', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/welcome/template.html" 
    };
});