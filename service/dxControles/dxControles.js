angular.module('ControlesAngular')
    .factory('dxControles', ['controlesService', function (controlesService) {

        //Objeto que regresa el factory con las propiedades asignadas
        var dxControles = {};

        //URLS API
        var ACTION_SAVE = "/Controles/Guardar/";
        var ACTION_GET = "/Controles/Get/";
        var ACTION_DATASOURCE = "/DataSource/Get/";
        var API_URL = 'http://localhost:64632/Api';

        var enumTipos = {
            Texto: 1,
            Numerico: 2,
            Fecha: 3,
            CheckBoxList: 4,
            RadioButtonList: 5,
            List: 6,
            Multiseleccion: 7,
            Switch: 8,
            TextArea: 9,
            SubirDocumentos: 10
        };

        dxControles.getDataSource = function (UUID, Key) {
            //consumir service que obtiene datos de la API
            controlesService.getDataSource(API_URL, ACTION_GET, UUID, Key)
                .then(function (response) {
                    dxControles.transformControlToDx(response.data);
                }, function (error) {
                    console.error(error);
                });
        };

        dxControles.transformSectionToDx = function () {
            //se transforman las secciones con la configuracion Dx
        };

        dxControles.transformControlToDx = function (data) {
            //configuracion generica para todos los contoles
            console.log(data);
        };

        dxControles.getEditorType = function (objControl, varObjDX) {
            //Configuracion especifica para cada tipo de control
            var strTipo = "";

            switch (objControl.tipoControl) {
                case enumTipos.Texto:
                    strTipo = "dxTextBox";
                    break;
                case enumTipos.Numerico:
                    strTipo = "dxNumberBox";
                    break;
                case enumTipos.Fecha:
                    strTipo = "dxDateBox";
                    break;
                case enumTipos.CheckBoxList:
                    strTipo = "dxTagBox";
                    break;
                case enumTipos.RadioButtonList:
                    strTipo = "dxRadioGroup";
                    break;
                case enumTipos.List:
                    strTipo = "dxSelectBox";
                    break;
                case enumTipos.Multiseleccion:
                    strTipo = "dxTagBox";
                    break;
                case enumTipos.Switch:
                    strTipo = "dxSwitch";
                    break;
                case enumTipos.TextArea:
                    strTipo = "dxTextArea";
                    break;
                default:
                    strTipo = "dxTextBox";
                    break;
            }

            varObjDX.editorType = strTipo;
            return varObjDX;
        };

        dxControles.buscarIndex = function () {
            //
        };

        dxControles.aplicarFormatoFecha = function () {
            //
        };

        dxControles.save = function () {
            //Guardar o Editar los valores de los controles en un formulario
            return 'Save';
        };

        return dxControles;
    }]);