angular.module('mapTickethunt',['ui-notification'])

.directive('map', ["TicketService", function(TicketService){
    return {
        restrict: 'E',
        templateUrl: "../app/modules/map/template.html",
        controller: function($scope,$timeout,$mdDialog,Notification){


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
						   ticket: singleTicket, Notification:Notification
					 	 },
						 controller: function($scope, $mdDialog, ticket,Notification) {
					        ticket.valid_until = new Date (ticket.valid_until);
					        $scope.ticket = ticket;
					        $scope.closeDialog = function() {
					          $mdDialog.hide();
					        }
					        $scope.claimed = function(){
					        	/*TicketService.delete({id: ticket.id}).$promise.then(function(response){
									Notification.primary('You claimed this ticket');
					                $scope.closeDialog();					        		
					        	});*/
					        	Notification.primary('You claimed this ticket');
					            $scope.closeDialog();
				               

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
                $scope.map = L.map('map').setView([51, 10], 7);
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
}]).config(function(NotificationProvider) {
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
