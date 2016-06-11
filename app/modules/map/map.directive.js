angular.module('mapTickethunt',[])

.directive('map', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/map/template.html"
    };
});