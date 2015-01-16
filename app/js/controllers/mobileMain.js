angular.module('mQuiz')
    .controller('MainMobileCtrl', function($scope, $location, $firebase) {
        this.headingTitle = 'Quiz';

        $scope.stopGame = function() {
            $scope.game.isRun = false;
        };

        var ref = new Firebase("https://quiz-game.firebaseio.com/");
        var sync = $firebase(ref);
        var syncObject = sync.$asObject();
        syncObject.$bindTo($scope, "game");

    });