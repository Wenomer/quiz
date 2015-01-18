angular.module('mQuiz')
    .controller('GameMobileCtrl', function(FireDB, $scope) {
        $scope.answer = function() {
            $scope.state.game.lock = true;
            $scope.state.game.answer = $scope.state.user.name;
        }
    });