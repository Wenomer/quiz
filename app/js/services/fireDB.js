angular.module('mQuiz')
    .factory('FireDB', function($firebase) {
        var ref = new Firebase("https://quiz-game.firebaseio.com/");
        var sync = $firebase(ref);
        return sync.$asObject();
    });