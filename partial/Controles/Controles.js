angular.module('ControlesAngular')
    .config(function ($routeProvider) {
        $routeProvider.when('/controles', {
            templateUrl: 'partial/Controles/Controles.html',
            controller: 'ControlesCtrl',
            controllerAs: 'vm'
        });
    })
    .controller('ControlesCtrl', ['dxControles', 'toaster', function (dxControles, toaster) {

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
            
            dxControles.getDataSource(vm.uuidSelected)
                .then(function (response) {

                    // console.log(vm.formInstance);
                    console.log(response);

                    // response.showValidationSummary = true;
                    // response.onInitialized = vm.initDxForm;
                    // response.onInitialized = vm.initDxForm;



                    vm.formInstance.updateData("myData", response.items[0].items);

                    console.log(vm.formInstance.option());


                    // vm.dataForm = response;

                    vm.formInstance.repaint();

                    // console.log(response);
                    // console.log(vm.formInstance);


                    vm.limpiar = true;

                }, function (error) {
                    toaster.pop('error', "Error", "Ha ocurrido un error");
                    console.error(error);
                });

        };

        vm.resetFrom = function () {
            vm.formInstance.resetValues();
        };
    }]);
