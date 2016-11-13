var angular = require("angular"),
    CommModule = require("../../Services/CommModule.js"),
    angularMaterial = require("angular-material"),
    ngDraggable = require("ng-draggable"),
    template = require("./m1m-server-manager.html")
    ;
module.exports = "m1m-server-manager";

console.log("Init of m1m-server-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService, $filter) {

    var ctrl = this;
    console.log("m1mServerManager:", $scope, CommService);
    this.mediaServers = CommService.mediaServers;
    $scope.serverName = "";
    $scope.currentServerID;
    $scope.listDirectories = [];

    console.log("m1mServer:", this.mediaServers);

    this.goto = function (serveurID) {
        $scope.currentServerID = serveurID;
        this.browse(serveurID);
        $scope.listDirectories = [];
    }

    CommService.onupdate = function () {
        $scope.$applyAsync(); // Mise à jour du rendu
    };

    this.browse = function (mediaServerId, directoryId, directoryName) {
        CommService.browse(mediaServerId, directoryId).then(function (data) {
            console.log("Browse", mediaServerId, directoryId, "=>", data);
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();
        });

        if (!angular.isUndefined(directoryId)) {
            $scope.listDirectories.push({ name: directoryName, dirID: directoryId });

            console.log("pushed list :", $scope.listDirectories);
            // path clic
            if (angular.isUndefined(directoryName)) {
                //search index of dir in listDirectories
                var item = $filter('filter')($scope.listDirectories, { dirID: directoryId })[0];
                var index = $scope.listDirectories.indexOf(item);
                $scope.listDirectories.splice(index+1);

                console.log("listDIr :", $scope.listDirectories, "index : ", index);
            }
        } else {
            // nav clic
            this.listDirectories = [];

        }
    }
    /*
        this.browsePath = function(mediaServerId, directoryId){

            // path clic
            if (angular.isUndefined(directoryName)) {
                //search index of dir in listDirectories
                var item = $filter('filter')($scope.listDirectories, { dirID: directoryId })[0];
                var index = $scope.listDirectories.indexOf(item);
                $scope.listDirectories.splice(index);

                console.log("listDIr :", $scope.listDirectories);
            }

            CommService.browse( mediaServerId, this.listParent[len]).then( function(data) {
                console.log( "Browse", mediaServerId, this.listParent[this.listParent.length-1], "=>", data );
                ctrl.directories = data.directories;
                ctrl.medias = data.medias;
                $scope.$applyAsync();
            });
          
            console.log( "poped list : ", this.listParent );
        }
        */
        
}
controller.$inject = ["$scope", "CommService", "$filter"];

angular.module(module.exports, [CommModule, angularMaterial, "ngDraggable"])
    .component("m1mServerManager", {
        controller: controller,
        bindings: { title: "@" },
        template: template
    });