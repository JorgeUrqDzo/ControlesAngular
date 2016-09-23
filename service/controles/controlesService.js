angular.module('ControlesAngular')
    .service('controlesService', ['$http', function ($http) {

        this.getAll = function (url) {
            return $http.get(url);
        };

        this.save = function () {

        };

        this.get = function () {

        };

        this.getDataSource = function (action, actionDataSource, uuid, key) {
            var url = action + actionDataSource + uuid + "?key=" + key;
            // console.log(url);
            return $http.get(url);
        };
    }]);