angular.module('mapTickethunt',[])

.directive('map', ["TicketService", function(TicketService){
    return {
        restrict: 'E',
        templateUrl: "/app/modules/map/template.html",
        controller: function($scope){

        

        	$scope.map = null;
			$scope.OpenStreetMap = null;

			$scope.add_markers = function(ticketsData){
				
				ticketsData.forEach(function(ticket){
					$scope.add_marker(ticket);
				});
			}
			$scope.add_marker = function (singleTicket){
				var LatLng = singleTicket.location.coordinates;
				var type = singleTicket.ticket_type[0].show_name;
				var valid_until = singleTicket.valid_until;
				var marker = L.marker(LatLng).addTo(map).bindPopup(type+"<br/> Noch gültig:"+valid_until+"<br/><button>Mitnehmen</button>");
				return marker;
			}



			$(document).ready(function() {
			    map = L.map('map').setView([48.4222305, 9.95558200000005], 15);
			    // create the tile layer with correct attribution
			    OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', { maxZoom: 25, minZoom: 5, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
			
			   	TicketService.get()
        		.$promise
        		.then(function (result){
        			var ticketsData  = result;
        			$scope.add_markers(ticketsData);
        		});


			});
        }
    };
}]);