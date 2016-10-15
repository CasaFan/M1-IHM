var angular		        = require( "angular" ),
    //CommModule          = require( "../../Services/CommModule.js" ),
    //angularMaterial		= require( "angular-material" ),
    //ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-media.html" )
    ;
module.exports = "m1m-media-module";

console.log( "Init of m1m-media-Module");

function controller($scope) {
    var ctrl = this;
    this.nf = this.directories;
    console.log( "$scope", $scope);
    this.displayDescription = function() {
        console.log( "description:", ctrl.nf.longdescription );
    }
}
controller.$inject = ["$scope"];

angular .module     ( module.exports, [] )
        .component  ( "m1mMedia", {
            controller  : controller,
            bindings    : {nf: "<"},
            template	: template
        });
