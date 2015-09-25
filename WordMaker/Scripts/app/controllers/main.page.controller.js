(function () {
    'use strict';

    wordMakerApp.controller('main-page-controller', ['$scope', 'DS_Words', 'DS_Players', '$compile', mainPageController]);

    function mainPageController($scope, DS_Words, DS_Players, $compile) {
        var defaultSymbols = $('#defaultSymbols');
        var resultSymbols = $('#resultSymbols');

        $scope.startNewGame = function () {
            DS_Words.getRandomWord().then(function (word) {

                $scope.defaultWord = word.split('');
                $scope.resultWord = new Array(word.length);

                DS_Words.getContainedWords(word).then(function (containedWords) {
                    $scope.containedWords = containedWords;
                });

                for (var i = 0; i < word.length; ++i) {
                    $scope.resultWord[i] = '_';
                }

                for (i = 0; i < word.length; ++i) {
                    var wordSymbol = $compile('<div ng-bind="defaultWord[' + i + ']"></div>')($scope);
                    $(wordSymbol)
                        .addClass('wordSymbol')
                        .addClass('defaultSymbol')
                        .data('id', i);
                    angular.element(document.getElementById('defaultSymbols')).append(wordSymbol);
                    $compile(wordSymbol)($scope);

                    var symbolContainer = $compile('<div ng-bind="resultWord[' + i + ']"></div>')($scope);
                    $(symbolContainer)
                        .addClass('wordSymbol')
                        .addClass('resultSymbol')
                        .append('•')
                        .data('id', i);

                    angular.element(document.getElementById('resultSymbols')).append(symbolContainer);
                    $compile(symbolContainer)($scope);

                    defaultSymbols.append(wordSymbol);
                    resultSymbols.append(symbolContainer);

                }

                $('.defaultSymbol')
                    .draggable({
                        containment: '#gamefield',
                        cursor: 'move',
                        revert: function (event, ui) {
                            $(this).data("uiDraggable").originalPosition = {
                                top: 0,
                                left: 0
                            };
                            return !event;
                        }
                    }, {
                        start: function (event, ui) {
                            //...
                        }
                    });

                $('.resultSymbol').droppable({
                    accept: '.defaultSymbol',
                    tolerance: 'pointer'
                }, {
                    drop: function (event, ui) {
                        var $this = $(this);
                        ui.draggable.position({
                            my: 'center',
                            at: 'center',
                            of: $this,
                            using: function (pos) {
                                $(this).animate(pos, 200, 'linear');
                            }
                        });

                        var resultSymbolId = $(this).data('id');
                        var defaultSymbolId = $(ui.draggable).data('id');

                        $scope.resultWord[resultSymbolId] = $scope.defaultWord[defaultSymbolId];

                        $(this).addClass('filled');
                        $(this).droppable('option', 'accept', ui.draggable);


                        var resultWord = $scope.resultWord.join('');
                        resultWord = resultWord.substring(0, resultWord.match(/[^_]/gi).length);
                        if (resultWord.indexOf('_') === -1 && $scope.containedWords.indexOf(resultWord) !== -1) {
                            alert('success');
                        }
                    },

                    out: function (event, ui) {
                        $(this).removeClass('filled');
                        $(this).droppable('option', 'accept', '.defaultSymbol');

                        var resultSymbolId = $(this).data('id');                       

                        $scope.resultWord[resultSymbolId] = '_';
                    }
                });
            });
        }
    }

})();

