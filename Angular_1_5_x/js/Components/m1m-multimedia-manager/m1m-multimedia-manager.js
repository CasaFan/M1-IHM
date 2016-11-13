var angular = require("angular"),
    CommModule = require("../../Services/CommModule.js"),
    angularMaterial = require("angular-material"),
    ngDraggable = require("ng-draggable"),
    template = require("./m1m-multimedia-manager.html"),
    //moment = require("./../../../bower_components/moment/min/moment.min.js"),
    //m1mMediaRenders     = require("./../m1m-mediaRender-manager/m1m-mediaRender-manager.js"),
    m1mServers = require("./../m1m-server-manager/m1m-server-manager.js")
    ;
module.exports = "m1m-multimedia-manager-Module";

var utils = require("./../../Services/utils.js");

console.log("Init of m1m-multimedia-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService) {
    var ctrl = this;
    
    $scope.playing = false;
    $scope.mediaLength = 0;
    $scope.timerRunning = false;

    this.currentMedia;
    this.currentAVT;

    this.currentRenderingControl;
    this.currentMediaMetaData;
    $scope.currentMediaData;


    console.log("m1mMultimediaManager:", $scope, CommService);
    ctrl.mediaRenderers = CommService.mediaRenderers;

    //TODO : try no render catch err
    $scope.currentRenderId = "";
    

    CommService.onupdate = function () {
        $scope.$applyAsync(); // Mise à jour du rendu
    };

    this.setRenderer = function (mediaRendererId) {
        $scope.currentRenderId = mediaRendererId;
        this.getEtatLecteur(mediaRendererId);
        console.log("set rendererId : ", mediaRendererId);
        
    }
    this.test = function () {
        console.log("coucou");
    }
    

    this.play = function () {
        CommService.play($scope.currentRenderId);
        $scope.playing = true;
        console.log("play");
    }

    this.pause = function () {
        CommService.pause($scope.currentRenderId);
        $scope.playing = false;
        console.log("paused");
    }

    this.stop = function () {
        CommService.stop($scope.currentRenderId);
        console.log("stopped");
    }

    this.setVolume = function (volume) {
        CommService.setVolume($scope.currentRenderId, volume);

    }

    this.loadMedia = function (mediaRendererId, mediaServerId, itemId) {
        CommService.loadMedia(mediaRendererId, mediaServerId, itemId);

        //autoplay when dropped
        this.play(mediaRendererId);
        $scope.$broadcast('timer-start');
        console.log("media loaded ");
    }
    /**
     * get etat courrant du lecteur 
     * 
     */
    this.getEtatLecteur = function (mediaRenderId) {
        utils.call(mediaRenderId, "getMediasStates", []).then(function (data) {
            console.log("dataGot =>", data);
            this.currentAVT = data['urn:schemas-upnp-org:service:AVTransport:1'];
            
            // TODO : get current media length
            /*var momento = new moment(this.currentAVT['CurrentMediaDuration'], "HH:mm:ss");
            $scope.mediaLength =  momento.hours()*3600 + momento.minutes()*60 + momento.seconds();
            console.log("mediaLength : ", $scope.mediaLength);
            */
            // getMediaName by parsing xml metaData to json
            var x2js = new X2JS();
            this.currentMediaMetaData = x2js.xml_str2json(this.currentAVT['CurrentTrackMetaData']);
            $scope.currentMediaData = this.currentMediaMetaData['DIDL-Lite'].item;
            console.log("media", this.currentMediaMetaData);

            // if status OK getState
            if (this.currentAVT['TransportStatus'] == "OK") {
                switch (this.currentAVT['TransportState']) {
                    case "PAUSED_PLAYBACK":
                        $scope.playing = false;
                        break;
                    case "PLAYING":
                        $scope.playing = true;
                        break;
                    case "STOPPED":
                        $scope.playing = false;
                        break;
                    default:
                        console.log("Etat lecteur inconnu");
                }
            } else {
                console.log("renderer err");
            }

            //get volumeEtat & bind in scope
            this.currentRenderingControl = data['urn:schemas-upnp-org:service:RenderingControl:1'];
            $scope.volume = parseInt(this.currentRenderingControl['Volume'], 10);
        });
    }
}
controller.$inject = ["$scope", "CommService"];

angular.module(module.exports, [CommModule, angularMaterial, "ngDraggable", m1mServers, 'ngMdIcons', 'timer'])
    .component("m1mMultimediaManager", {
        controller: controller,
        bindings: {
            title: "@",
            currentMediaData: "@",
            playing: "=",
            volume: "="
        },
        template: template
    });
