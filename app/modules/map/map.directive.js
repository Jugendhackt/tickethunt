angular.module('mapTickethunt',[])

.directive('map', ["TicketService", function(TicketService){
    return {
        restrict: 'E',
        templateUrl: "../app/modules/map/template.html",
        controller: function($scope,$timeout,$mdDialog){


        	$scope.map = null;
			$scope.OpenStreetMap = null;
			$scope.showclaim= false;

			$scope.add_markers = function(ticketsData){
				
				ticketsData.forEach(function(ticket){
					$scope.add_marker(ticket);
				});
			}
			$scope.add_marker = function (singleTicket){
				var LatLng = singleTicket.location.coordinates;
				var marker = L.marker(LatLng).addTo($scope.map).on('click', function(e){
					var parentEl = angular.element(document.body);
					$mdDialog.show({
						 parent: parentEl,
						 templateUrl: "../app/modules/claimTicket/template.html",
					
						 locals: {
						   ticket: singleTicket
					 	 },
						 controller: function($scope, $mdDialog, ticket) {
					        ticket.valid_until = new Date (ticket.valid_until);
					        $scope.ticket = ticket;
					        $scope.closeDialog = function() {
					          $mdDialog.hide();
					        }
					     }


					});
				});
				return marker;
			}


            $scope.refreshMap = function(){
                var bounds = $scope.map.getBounds();
                var bbox = bounds._southWest.lat + ',' + bounds._southWest.lng + ',' + bounds._northEast.lat + ',' + bounds._northEast.lng;
                console.log(bbox);
                TicketService.get({in_bbox:bbox})
                .$promise
                .then(function (result){
                    var ticketsData  = result;
                    $scope.removeAllMarkers();
                    $scope.add_markers(ticketsData);
                });
            }

            $scope.removeAllMarkers = function (){
                $scope.map.eachLayer(function (layer) {

                    if (layer instanceof L.Marker) {
                        $scope.map.removeLayer(layer);
                    }
                });
            }

            $timeout(function() {
                $scope.map = L.map('map').setView([50, 10], 15);
                // create the tile layer with correct attribution
                $scope.OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', { maxZoom: 25, minZoom: 5, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo($scope.map);

                $scope.markers = new L.FeatureGroup();

                $scope.map.on('click', function(e) {
                    $scope.map.zoomIn();
                });
                $scope.map.on('dblclick', function(e) {
                    $scope.map.setView(e.latlng);
                });

                $scope.map.on('moveend', function(e) {
                    $scope.refreshMap();
                });
                $scope.refreshMap();
            },0);
        }
    };
}]);