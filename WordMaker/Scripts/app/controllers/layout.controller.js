(function () {
    'use strict';

    wordMakerApp.controller('layout-controller', ['$scope','$modal', 'DS_Players', layoutController]);

    function layoutController($scope, $modal, DS_Players) {        
        $scope.openRegisterModal = function (registerMod) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/Modals/Register.Modal.html',
                controller: 'ctrl-modal-register',
                resolve: {
                    registerMod: function () {
                        return registerMod;
                    }
                }
            });

            modalInstance.result.then(function (player) {
                $scope.player = player;
            });
        }

        $scope.logout = function () {
            DS_Players.logout();
        }
    }
})();

