angular.module('mQuiz', ['ngRoute', 'firebase', 'adaptive.detection'])
    .config(function($locationProvider, $routeProvider, $detectionProvider) {
        $locationProvider.html5Mode(true);
        var isMobile = $detectionProvider.$get().isAndroid() || $detectionProvider.$get().isiOS() || $detectionProvider.$get().isWindowsPhone();

        $routeProvider
            .when('/', {
                templateUrl: isMobile ? 'public/views/mobile_main.html' : 'public/views/desktop_main.html',
                controller: isMobile ? 'MainMobileCtrl' : 'MainDesktopCtrl',
                controllerAs: isMobile ? 'mainMobileCtrl' : 'mainDesktopCtrl'
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