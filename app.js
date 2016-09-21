angular.module('ControlesAngular', ['ui.bootstrap','ngRoute','ngAnimate']);

angular.module('ControlesAngular').config(function($routeProvider) {

    $routeProvider.when('Controles',{templateUrl: 'partial/Controles/Controles.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/home'});

});

angular.module('ControlesAngular').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
