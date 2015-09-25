(function () {
    'use strict';

    wordMakerApp.controller('ctrl-modal-register', ['$scope', '$modalInstance', 'DS_Words', 'DS_Players', 'registerMod', registerCtrl]);

    function registerCtrl($scope, $modalInstance, DS_Words, DS_Players, registerMod) {
        $scope.caption = registerMod ? 'Регистрация нового игрока' : 'Аутентификация игрока';
        $scope.registerMod = registerMod;
        $scope.isBusy = false;
        $scope.alert = {
            visible: false,
            message: ''
        };

        $scope.register = function () {
            //$scope.isBusy = true;
            //$scope.alert.visible = false;

            var player = {
                userName: $scope.userName,
                password: $scope.password,
                confirmPassword: $scope.confirmPassword
            };


            DS_Players.register(player).then(function (status) {
                $scope.status = status;
            });

            $modalInstance.close();
        }

        $scope.login = function (e) {
            var player = {
                grant_type: 'password',
                userName: $scope.userName,
                password: $scope.password,
            };

            DS_Players.login(player).then(function (status) {
                $scope.status = status;
            });

            $modalInstance.close(player);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
})();