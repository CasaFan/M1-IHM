var angular		        = require( "angular" ),
    CommModule          = require( "../../Services/CommModule.js" ),
    angularMaterial		= require( "angular-material" ),
    ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-mediaRender-manager.html" )
    ;
module.exports = "m1m-mediaRender-manager";

console.log( "Init of m1m-mediaRender-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService) {
    var ctrl = this;

     console.log( "m1mMediaRenderManager:", $scope, CommService );

     ctrl.mediaRenderers = CommService.mediaRenderers;

     CommService.onupdate = function() {
        $scope.$applyAsync(); // Mise à jour du rendu
    };
    /*this.browse = function( mediaServerId, directoryId ) {
        CommService.browse( mediaServerId, directoryId ).then( function(data) {
            console.log( "Browse", mediaServerId, directoryId, "=>", data );
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();
        });
    }*/
    this.loadMedia = function(mediaRendererId, mediaServerId, itemId){
        CommService.loadMedia(mediaRendererId, mediaServerId, itemId);
        this.play(mediaRendererId);
        console.log("media loaded ");
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

    this.setVolume = function(mediaRendererId, volume){
        CommService.setVolume(mediaRendererId, volume); 
    }
}
controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule, angularMaterial, "ngDraggable"] )
        .component  ( "m1mMediaRenderManager", {
            controller  : controller,
            bindings    : {title: "@"},
            template	: template
        });