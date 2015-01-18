angular.module('mQuiz', ['ngRoute', 'firebase', 'adaptive.detection', 'ngCookies'])
    .config(function($locationProvider, $routeProvider, $detectionProvider) {
//        $locationProvider.html5Mode(true);
        var isMobile = $detectionProvider.$get().isAndroid() || $detectionProvider.$get().isiOS() || $detectionProvider.$get().isWindowsPhone();
        var prefix = isMobile ? 'Mobile' : 'Desktop';

        $routeProvider
            .when('/', {
                templateUrl: 'public/views/'+prefix.toLowerCase()+'_main.html',
                controller: 'Main'+prefix+'Ctrl',
                controllerAs: 'main'+prefix+'Ctrl'
            })
            .when('/game', {
                templateUrl: 'public/views/'+prefix.toLowerCase()+'_game.html',
                controller: 'Game'+prefix+'Ctrl',
                controllerAs: 'Game'+prefix+'Ctrl'
            })
//            .when('/:repository', {
//                templateUrl: 'views/repositories.html',
//                controller: 'RepositoryCtrl'
//            })

            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
            return {
                responseError: function(response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            }
        })
    });