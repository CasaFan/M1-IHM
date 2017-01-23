var angular = require("angular"),
    CommModule = require("../../Services/CommModule.js"),
    angularMaterial = require("angular-material"),
    ngDraggable = require("ng-draggable"),
    template = require("./m1m-server-manager.html")
    ;
module.exports = "m1m-server-manager";

console.log("Init of m1m-server-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService, $filter, $mdDialog) {

    var ctrl = this;
    console.log("m1mServerManager:", $scope, CommService);
    this.mediaServers = CommService.mediaServers;
    $scope.serverName = "";
    $scope.currentServerID;
    $scope.listDirectories = [];
    $scope.showHome = false;

    console.log("m1mServer:", this.mediaServers);

    this.goto = function (serveurID) {
        $scope.currentServerID = serveurID;
        this.browse(serveurID);
        $scope.listDirectories = [];
        $scope.showHome = true;
    }

    CommService.onupdate = function () {
        $scope.$applyAsync(); // Mise à jour du rendu
    };

    this.browse = function (mediaServerId, home, directoryId, directoryName) {
        CommService.browse(mediaServerId, directoryId).then(function (data) {
            console.log("Browse", mediaServerId, directoryId, "=>", data);
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();
        });

        if (home) {
            $scope.listDirectories = [];
        }

        if (!angular.isUndefined(directoryId)) {
            $scope.listDirectories.push({ name: directoryName, dirID: directoryId });
            console.log("pushed list :", $scope.listDirectories);

            // path clic
            if (angular.isUndefined(directoryName)) {
                //search index of dir in listDirectories
                var item = $filter('filter')($scope.listDirectories, { dirID: directoryId })[0];
                var index = $scope.listDirectories.indexOf(item);
                $scope.listDirectories.splice(index + 1);
                console.log("listDIr :", $scope.listDirectories, "index : ", index);
            }

        } else {
            // nav clic
            this.listDirectories = [];
        }
        
    }

    this.openDescription = function (ev, media) {
        console.log($scope);
        $mdDialog.show({
            targetEvent: ev,
            template: '<md-dialog aria-label="media">'
            + '<md-toolbar style="background-color: #19ad89;"><div class="md-toolbar-tools"><h2>'
            + media.title + '</h2></div></md-toolbar>'
            + '<md-dialog-content>'
            + '<div class="md-dialog-content">'
            + '<div style="text-aligne:center;"><img ng-src="' + media.icon + '" style="display: block;"/></div>'
            + '<p><span style="color:#ff4081">Acteurs : </span>'
            //+'<label ng-repeat="acteur in '+media.actors+'">{{acteur}}<'
            + media.actors.toString() + '</p>'
            + '<p><span style="color:#ff4081">Createurs : </span>' + media.creator + '</p>'
            + '<p><span style="color:#ff4081">Date : </span>' + media.date + '</p>'
            + '<p><span style="color:#ff4081">Description : </span>' + media.description + '</p>'
            + '<p><span style="color:#ff4081">Genres : </span>' + media.genres.toString() + '</p>'
            + '<p><span style="color:#ff4081">Long Description : </span>' + media.longdescription + '</p>'
            + '</div>'
            + '</md-dialog-content>'
            + '</md-dialog>',
            //templateUrl:'mediaDescription.tmpl.html',
            clickOutsideToClose: true,
            escapeToClose: true,
            locals: { media: media }
        });
    };

}
controller.$inject = ["$scope", "CommService", "$filter", "$mdDialog"];

angular.module(module.exports, [CommModule, angularMaterial, "ngDraggable"])
    .component("m1mServerManager", {
        controller: controller,
        bindings: { title: "@" },
        template: template
    });