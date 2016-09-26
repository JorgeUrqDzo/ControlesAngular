angular.module('ControlesAngular')
    .factory('dxControles', ['controlesService', function (controlesService) {

        //Objeto que regresa el factory con las propiedades asignadas
        var dxControles = {};

        //URLS API
        var ACTION_SAVE = "/Controles/Guardar/";
        var ACTION_GET = "/Controles/Get/";
        var ACTION_DATASOURCE = "/DataSource/Get/";
        var API_URL = 'http://localhost:64632/Api';

        var varObjDX = {};
        // var objSectionDX = {};
        // dxControles.formOptions = {};
        // var index;
        // dxControles.Sections = [];

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
            var varObjDX = {};
            var objSectionDX = {};
            dxControles.formOptions = {};
            var index;
            dxControles.Sections = [];
            return controlesService.getDataSource(API_URL, ACTION_GET, UUID, Key)
                .then(function (response) {
                    objSectionDX = dxControles.transformSectionToDx(response.data.LstModApiSeccion);
                    if (objSectionDX.IdGrupo !== 0) {
                        //Si es diferente de 0 valida si ya esta este grupo en el listado
                        index = dxControles.buscarIndex(objSectionDX.IdGrupo);
                        if (index !== undefined) {
                            dxControles.Sections[index].tabs.push(objSectionDX);
                        }
                        else {
                            dxControles.Sections.push(
                                {
                                    itemType: 'tabbed',
                                    IdGrupo: objSectionDX.IdGrupo,
                                    tabs: [objSectionDX],
                                    tabPanelOptions: {///Hace que se cargue todo aunque el tab no se este mostrando
                                        deferRendering: false
                                    }
                                }
                            );
                        }
                    }
                    else {
                        objSectionDX.itemType = 'group';
                        dxControles.Sections.push(objSectionDX);
                    }

                    return dxControles.formOptions = {
                        colCount: 1,
                        labelLocation: 'top',
                        items: dxControles.Sections,
                    };

                }, function (error) {
                    return error;
                });
        };

        dxControles.transformSectionToDx = function (data) {
            //se transforman las secciones con la configuracion Dx
            for (var i in data) {
                varObjDX = {
                    caption: data[i].Nombre,
                    title: data[i].Nombre,
                    colCount: data[i].Columnas,
                    IdGrupo: data[i].IdGrupo,
                    icon: data[i].Icono
                };

                varObjDX.items = [];

                var controles = data[i].LstModApiControl;

                for (var j in controles) {
                    varObjDX.items.push(dxControles.transformControlToDx(controles[j]));
                }

            }

            return varObjDX;
        };

        dxControles.transformControlToDx = function (data) {
            //configuracion generica para todos los contoles
            var controlDX = {
                label: {
                    text: data.Nombre
                },
                dataField: data.IdSeccionControl,
                isRequired: data.Requerido,

                validationRules: [{
                    type: "required",
                    message: "Campo Requerido"
                }],

                hint: data.Caption,
                editorOptions: {
                    placeholder: data.Caption,
                    maxLength: data.Longitud,
                    value: data.ValorDefault,
                    name: data.NombreColumna,
                    control: data.IdTipoControl
                },
                cssClass: data.CssClass,
                helpText: data.HelpText
            };

            controlDX = dxControles.getEditorType(data, controlDX);

            return controlDX;
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

        dxControles.buscarIndex = function (idGrupo) {
            //busca el index en el que se encuentra el grupo
            var indexes = $.map(dxControles.Sections, function (obj, index) {
                if (obj.IdGrupo === idGrupo) {
                    return index;
                }
            });
            return indexes[0];
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