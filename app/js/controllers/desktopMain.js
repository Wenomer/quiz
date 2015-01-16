angular.module('mQuiz')
    .controller('MainDesktopCtrl', function($scope, $location, $firebase) {
        this.headingTitle = 'Quiz';

        $scope.send = function() {
            $scope.game.todos = [1,2,3];
        };

        $scope.runGame = function() {
            $scope.game.isRun = true;
        };

        var ref = new Firebase("https://quiz-game.firebaseio.com/");
        var sync = $firebase(ref);
        var syncObject = sync.$asObject();

        syncObject.$bindTo($scope, "game");

        syncObject.$loaded().then(function(){
            $scope.game.isRun = false;
        });

    });