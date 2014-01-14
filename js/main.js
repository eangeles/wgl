var wgl = angular.module('WGL', ['firebase', 'ngRoute']);

wgl.run(['angularFireAuth', '$rootScope', '$route', function(angularFireAuth, $rootScope, $route){
    var url = new Firebase("https://wingaminglounge.firebaseio.com/");
    angularFireAuth.initialize(url, {scope: $rootScope, name: "fb_user",path: '/'});

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

wgl.config(function ($routeProvider){
    $routeProvider
        .when("/" , {
            title: 'Home',
            templateUrl: "partials/home.html"
        })
        .when("/about", {
            title: 'About Us',
            authRequired: false,
            templateUrl:"partials/about.html"
        })
        .when("/gts", {
            title: 'Gamer Tracking System',
            authRequired: false,
            templateUrl:"partials/gts.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/ladder", {
            title: 'Ladder',
            authRequired: false,
            templateUrl:"partials/ladder.html",
            resolve: {
                factory: checkPermission
            }
        })
        .otherwise({
        	redirectTo:"/",
        	title: "Home"
        });
        
}).directive('autoComplete', function($timeout) {
        return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                        iElement.trigger('input');
                    }, 0);
                }
            });
        };
    });

var checkPermission = function ($q, $rootScope, $location){

//    if(!$rootScope.user || $rootScope.user.userType == 'Gamer'){
//        $location.path('/');
//    }

}






