function seccionConfig(){
   var vm = this;
   vm.icono = "icono";
}

angular.module('ControlesAngular')
.component('seccionesConfigurationComponent', {

    templateUrl: 'directive/seccionesConfigurationComponent/seccionesConfigurationComponent.html',
    controller: seccionConfig,
    controllerAs: 'vm',
    bindings:{

    }
});
