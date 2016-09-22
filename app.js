angular.module('ControlesAngular', ['ui.bootstrap','ngRoute','ngAnimate','toaster', 'ngSanitize', 'dx']);

angular.module('ControlesAngular').config(function($routeProvider) {

    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/controles'});

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
