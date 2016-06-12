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
				var type = singleTicket.ticket_type[0].show_name;
				var valid_until = singleTicket.valid_until;
				var marker = L.marker(LatLng).addTo($scope.map).on('click', function(e){
					var parentEl = angular.element(document.body);
					$mdDialog.show({
					 parent: parentEl,
					 targetEvent: $event,
					 template:
					   '<md-dialog aria-label="List dialog">' +
					   '  <md-dialog-content>'+
					   '    <md-list>'+
					   '      <md-list-item ng-repeat="item in items">'+
					   '       <p>Number {{item}}</p>' +
					   '      '+
					   '    </md-list-item></md-list>'+
					   '  </md-dialog-content>' +
					   '  <md-dialog-actions>' +
					   '    <md-button ng-click="closeDialog()" class="md-primary">' +
					   '      Close Dialog' +
					   '    </md-button>' +
					   '  </md-dialog-actions>' +
					   '</md-dialog>',
					 locals: {
					   items: $scope.items
					 }

					});
				});
				return marker;
			}

			


			$timeout(function() {
			    $scope.map = L.map('map').setView([50, 10], 15);
			    // create the tile layer with correct attribution
			    $scope.OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', { maxZoom: 25, minZoom: 5, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo($scope.map);
			
			   	TicketService.get()
        		.$promise
        		.then(function (result){
        			var ticketsData  = result;
        			$scope.add_markers(ticketsData);
        		});

        		$scope.map.on('click', function(e) {
				    $scope.map.zoomIn();
				});
				$scope.map.on('dblclick', function(e) {
				    $scope.map.setView(e.latlng);
				});
        	},0);
        }
    };
}]);