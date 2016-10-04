angular.module('ControlesAngular')
.config(function ($routeProvider) {
        $routeProvider.when('/formularioBandeja', {
            templateUrl: 'partial/FormulariosBandeja/FormulariosBandeja.html',
            controller: 'FormulariosbandejaCtrl',
            controllerAs: 'vm'
        });
    })
.controller('FormulariosbandejaCtrl',function($scope){


});