var angular		        = require( "angular" ),
    CommModule          = require( "../../Services/CommModule.js" ),
    angularMaterial		= require( "angular-material" ),
    ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-multimedia-manager.html" )
    ;
module.exports = "m1m-multimedia-manager-Module";

console.log( "Init of m1m-multimedia-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService) {
    var ctrl = this;

    console.log( "m1mMultimediaManager:", $scope, CommService );
    this.mediaRenderers = CommService.mediaRenderers;
    this.mediaServers   = CommService.mediaServers;
    CommService.onupdate = function() {
        $scope.$applyAsync(); // Mise à jour du rendu
    };
    this.browse = function( mediaServerId, directoryId ) {
        CommService.browse( mediaServerId, directoryId ).then( function(data) {
            console.log( "Browse", mediaServerId, directoryId, "=>", data );
            ctrl.directories = data.directories;
            $scope.$applyAsync();
        });
    }
    
    this.play = function(mediaRendererId){
        CommService.play(mediaRendererId);
    }

    this.pause = function(mediaRendererId){
        CommService.pause(mediaRendererId);
    }

    this.stop = function(mediaRendererId){
        CommService.stop(mediaRendererId);
    }
}
controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule, angularMaterial, "ngDraggable"] )
        .component  ( "m1mMultimediaManager", {
            controller  : controller,
            bindings    : {title: "@"},
            template	: template
        });
