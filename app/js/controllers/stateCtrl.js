angular.module('mQuiz')
    .controller('StateCtrl', function(FireDB, $scope, $detection, $location, $cookies) {
        var isMobile = $detection.isAndroid() || $detection.isiOS() || $detection.isWindowsPhone();
        $scope.state = {
            isMobile: isMobile,
            device: isMobile ? 'mobile': 'desktop',
            game: null,
            user: null
        };

        $scope.logout = function() {
            delete $cookies.game;
            delete $cookies.name;
            $scope.state.game = null;
            $scope.state.user = null;
            $location.path("#");
        };

        $scope.joinUser = function() {
            if (typeof $scope.settings.games[this.login.game].players === 'undefined') {
                $scope.settings.games[this.login.game].players = {};
            }

            if (typeof $scope.settings.games[this.login.game].players[this.login.name] === 'undefined') {
                $scope.settings.games[this.login.game].players[this.login.name] = {score :0, name: this.login.name};
            }

            $scope.state.game = $scope.settings.games[this.login.game];
            $scope.state.user = $scope.settings.games[this.login.game].players[this.login.name];

            $cookies.game = this.login.game;
            $cookies.name = this.login.name;
            $location.path("/game");
        };

        FireDB.$bindTo($scope, "settings");

        FireDB.$loaded().then(function(){
            if (typeof $cookies.game !== 'undefined' && typeof $cookies.name !== 'undefined') {
                $scope.state.game = $scope.settings.games[$cookies.game];
                $scope.state.user = $scope.settings.games[$cookies.game].players[$cookies.name];

                if ($scope.state.game && $scope.state.user) {
                    $location.path('/game');
                }
            }
        });




    });