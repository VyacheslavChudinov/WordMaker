
(function () {
    'use strict';

    wordMakerApp.factory('DS_Words', ['$http','$q', wordsDataSource]);

    function wordsDataSource($http, $q) {
        var tokenKey = "tokenInfo";

        function getRandomWord() {
            var deferred = $q.defer();

            $.ajax({
                type: 'GET',
                url: '/api/words/',
                beforeSend: function (xhr) {
                    var token = sessionStorage.getItem(tokenKey);
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },

                success: function (data) {
                    deferred.resolve(data);
                },

                fail: function (data) {
                    console.log(status);
                    deferred.reject(status);
                }
            });

            return deferred.promise;
        }

        function getContainedWords(word) {
            var deferred = $q.defer();

            $.ajax({
                type: 'GET',
                url: '/api/words/getContainedWords/' + word,
                beforeSend: function (xhr) {
                    var token = sessionStorage.getItem(tokenKey);
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },

                success: function (data) {
                    deferred.resolve(data);
                },

                fail: function (data) {
                    console.log(status);
                    deferred.reject(status);
                }
            });

            return deferred.promise;
        }

        return {
            getRandomWord: getRandomWord,
            getContainedWords: getContainedWords
        };
    }
})();