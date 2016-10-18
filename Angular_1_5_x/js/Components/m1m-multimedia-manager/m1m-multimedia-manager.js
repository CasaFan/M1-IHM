var angular		        = require( "angular" ),
    CommModule          = require( "../../Services/CommModule.js" ),
    angularMaterial		= require( "angular-material" ),
    ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-multimedia-manager.html" ),
    //m1mMediaRenders     = require("./../m1m-mediaRender-manager/m1m-mediaRender-manager.js"),
    m1mServers           = require("./../m1m-server-manager/m1m-server-manager.js")
    ;
module.exports = "m1m-multimedia-manager-Module";

console.log( "Init of m1m-multimedia-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService) {
    //var ctrl = this;
    $scope.vol = 50;

    console.log( "m1mMultimediaManager:", $scope, CommService );
    this.mediaRenderers = CommService.mediaRenderers;
    // TODO : getVolumeLecteur
    
    CommService.onupdate = function() {
        $scope.$applyAsync(); // Mise à jour du rendu
    };
    
    
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

    this.loadMedia = function(mediaRendererId, mediaServerId, itemId){
        CommService.loadMedia(mediaRendererId, mediaServerId, itemId);
        this.play(mediaRendererId);
        console.log("media loaded ");
    }
    
    $scope.onDropComplete = function(mediaRendererId){
        console.log("droped down ");
        CommService.loadMedia(mediaRendererId, this.dropppedObj.serverId, this.dropppedObj.mediaId);
        this.play(mediaRendererId);
    }
    
    
}
controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule, angularMaterial, "ngDraggable", m1mServers] )
        .component  ( "m1mMultimediaManager", {
            controller  : controller,
            bindings    : {title: "@"},
            template	: template
        });
