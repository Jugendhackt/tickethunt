angular.module('mapTickethunt',[])

.directive('map', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/modules/map/template.html",
        controller: function($scope){
        	$scope.map = null;
			$scope.OpenStreetMap = null;

			$scope.add_marker = function (LatLng){
				var marker = L.marker(LatLng).addTo(map).bindPopup("BW-Ticket <br/> Noch gültig:<br/><button>Mitnehmen</button>");
				return marker;
			}



			$(document).ready(function() {
			    map = L.map('map').setView([48.4222305, 9.95558200000005], 15);
			    // create the tile layer with correct attribution
			    OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', { maxZoom: 15, minZoom: 5, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
			    $scope.add_marker([48.4222305, 9.95558200000005]);

			});
        }
    };
});