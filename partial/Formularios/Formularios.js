angular.module('ControlesAngular')
.config(function ($routeProvider) {
        $routeProvider.when('/formulario', {
            templateUrl: 'partial/Formularios/Formularios.html',
            controller: 'FormulariosCtrl',
            controllerAs: 'vm'
        });
    })
.controller('FormulariosCtrl',function($scope){


});