angular.module('ControlesAngular')
    .config(function ($routeProvider) {
        $routeProvider.when('/controles', {
            templateUrl: 'partial/Controles/Controles.html',
            controller: 'ControlesCtrl',
            controllerAs: 'vm'
        });
    })
    .controller('ControlesCtrl', ['dxControles', function (dxControles) {

        var vm = this;
        vm.uuidSelected = "";
        vm.uuids = [
            '99db8f88-c1a1-447f-ade0-3ec56c8ba13b',
            'a65ba1f0-21cf-40c0-9040-c5deabaa844f'
        ];

        vm.getData = function () {
            console.log(vm.uuidSelected);
            // dxControles.getDataSource('99db8f88-c1a1-447f-ade0-3ec56c8ba13b');
        };

    }]);