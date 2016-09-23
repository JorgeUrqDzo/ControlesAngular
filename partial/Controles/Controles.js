angular.module('ControlesAngular')
    .config(function ($routeProvider) {
        $routeProvider.when('/controles', {
            templateUrl: 'partial/Controles/Controles.html',
            controller: 'ControlesCtrl',
            controllerAs: 'vm'
        });
    })
    .controller('ControlesCtrl', ['dxControles', 'toaster', '$location', function (dxControles, toaster, $location) {

        var vm = this;
        vm.limpiar = false;
        vm.uuidSelected = "";
        vm.formInstance = {};
        vm.dataForm = "";
        vm.uuids = [
            '99db8f88-c1a1-447f-ade0-3ec56c8ba13b',
            'a65ba1f0-21cf-40c0-9040-c5deabaa844f'
        ];
        vm.initDxForm = function (e) {
            vm.formInstance = e.component;
        };

        var employeeInfo = {
            FirstName: "John",
            LastName: "",
            Skype: "",
            Email: ""
        };

        vm.getData = function () {
 vm.dataForm = {};
            dxControles.getDataSource(vm.uuidSelected)
                .then(function (response) {
                   
                    // console.log(response);

                    // response.items = response.items[response.items.length - 1];

                    // response.onInitialized = vm.formInstance;
                    vm.dataForm = response;

                    $("#nzForm").dxForm(response);
                    // vm.formInstance.repaint();
                    // $("#nzForm").dxForm('instance').repaint();
                    // console.log($("#nzForm").dxForm('instance'));

                    // console.log(vm.formInstance);

                    vm.limpiar = true;

                }, function (error) {
                    toaster.pop('error', "Error", "Ha ocurrido un error");
                    console.error(error);
                });

        };

        vm.resetFrom = function () {

            // vm.formInstance.resetValues();
            $("#nzForm").dxForm('instance').resetValues();

        };
    }]);
