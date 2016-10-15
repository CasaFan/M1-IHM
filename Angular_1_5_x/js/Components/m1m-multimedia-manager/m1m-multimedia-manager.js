var angular		        = require( "angular" ),
    CommModule          = require( "../../Services/CommModule.js" ),
    angularMaterial		= require( "angular-material" ),
    ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-multimedia-manager.html" ),
    m1mMedia            = require("./../m1m-media-module/m1m-media.js")
    ;
module.exports = "m1m-multimedia-manager-Module";

console.log( "Init of m1m-multimedia-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService) {
    var ctrl = this;
    $scope.vol = 50;
    $scope.dropppedObj = [];

    console.log( "m1mMultimediaManager:", $scope, CommService );
    this.mediaRenderers = CommService.mediaRenderers;
    this.mediaServers   = CommService.mediaServers;

    // TODO : getVolumeLecteur
    
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
    /*
    $scope.onDropComplete = function(mediaRendererId){
        console.log("drop down ");
        CommService.loadMedia(mediaRendererId, this.dropppedObj.serverId, this.dropppedObj.mediaId);
        this.play(mediaRendererId);
    }
    */
    
}
controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule, angularMaterial, "ngDraggable", m1mMedia] )
        .component  ( "m1mMultimediaManager", {
            controller  : controller,
            bindings    : {title: "@"},
            template	: template
        });
