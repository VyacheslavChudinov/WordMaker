(function () {
    'use strict';

    wordMakerApp.factory('DS_Players', ['$http', '$q', playersDataSource]);

    function playersDataSource($http, $q) {
        var tokenKey = "tokenInfo";

        function register(player) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: '/api/Account/Register',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: player
            }

            $http(req)
                .success(function () {
                    deferred.resolve('Регистрация прошла успешно.');
                })
                .error(function () {
                    deferred.resolve('В ходе регистрации произошла ошибка.');
                });

            return deferred.promise;
        }

        function login(player) {

            var deferred = $q.defer();

            $.ajax({
                type: 'POST',
                url: '/Token',
                contentType: 'application/json; charset=utf-8',
                data: player
            }).success(function (data) {
                sessionStorage.setItem(tokenKey, data.access_token);
                deferred.resolve('Авторизация прошла успешно.');
            }).fail(function (data) {
                deferred.resolve('В ходе авторизации произошла ошибка.');
            });

            return deferred.promise;

            
        }

        function logout() {
            sessionStorage.removeItem(tokenKey);
        }

        return {
            register: register,
            login: login,
            logout: logout,

        };
    }

})();
