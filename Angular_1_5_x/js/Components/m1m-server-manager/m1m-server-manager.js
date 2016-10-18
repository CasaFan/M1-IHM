var angular		        = require( "angular" ),
    CommModule          = require( "../../Services/CommModule.js" ),
    angularMaterial		= require( "angular-material" ),
    ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-server-manager.html" )
    ;
module.exports = "m1m-server-manager";

console.log( "Init of m1m-server-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService) {
    
    var ctrl = this;

    console.log( "m1mServerManager:", $scope, CommService );
    
    this.mediaServers   = CommService.mediaServers;

    
    CommService.onupdate = function() {
        $scope.$applyAsync(); // Mise à jour du rendu
    };
    this.browse = function( mediaServerId, directoryId ) {
        CommService.browse( mediaServerId, directoryId ).then( function(data) {
            console.log( "Browse", mediaServerId, directoryId, "=>", data );
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();
        });
    }
}
controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule, angularMaterial, "ngDraggable"] )
        .component  ( "m1mServerManager", {
            controller  : controller,
            bindings    : {title: "@"},
            template	: template
        });