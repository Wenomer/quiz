angular.module('mQuiz')
    .controller('GameDesktopCtrl', function(FireDB, $scope) {
        $scope.startGame = function() {
            $scope.state.game.lock = false;
        }
    });