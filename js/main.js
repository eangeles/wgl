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
        .when("/users", {
            title: 'Users',
            authRequired: false,
            templateUrl:"partials/users.html",
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
        .when("/team", {
            title: 'Ladder',
            authRequired: false,
            templateUrl:"partials/team.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/matches", {
            title: 'Matches',
            authRequired: false,
            templateUrl:"partials/matches.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/tournaments", {
            title: 'Tournaments',
            authRequired: false,
            templateUrl:"partials/tournament.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/news", {
            title: 'News',
            authRequired: false,
            templateUrl:"partials/news.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/staff_news", {
            title: 'Staff News',
            authRequired: false,
            templateUrl:"partials/staff_news.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/newspage", {
            title: 'news',
            authRequired: false,
            templateUrl:"partials/newspage.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/addnews", {
            title: 'Add News',
            authRequired: false,
            templateUrl:"partials/addnews.html",
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
    }).directive('dirDisqus', function($window) {
        return {
            restrict: 'E',
            scope: {
                disqus_shortname: '@disqusShortname',
                disqus_identifier: '@disqusIdentifier',
                disqus_title: '@disqusTitle',
                disqus_url: '@disqusUrl',
                disqus_category_id: '@disqusCategoryId',
                disqus_disable_mobile: '@disqusDisableMobile',
                readyToBind: "@"
            },
            template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
            link: function(scope) {

                scope.$watch("readyToBind", function(isReady) {

                    // If the directive has been called without the 'ready-to-bind' attribute, we
                    // set the default to "true" so that Disqus will be loaded straight away.
                    if ( !angular.isDefined( isReady ) ) {
                        isReady = "true";
                    }
                    if (scope.$eval(isReady)) {
                        // put the config variables into separate global vars so that the Disqus script can see them
                        $window.disqus_shortname = scope.disqus_shortname;
                        $window.disqus_identifier = scope.disqus_identifier;
                        $window.disqus_title = scope.disqus_title;
                        $window.disqus_url = scope.disqus_url;
                        $window.disqus_category_id = scope.disqus_category_id;
                        $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                        // get the remote Disqus script and insert it into the DOM
                        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                        dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    }
                });
            }
        };
    });;

var checkPermission = function ($q, $rootScope, $location){

//    if(!$rootScope.user || $rootScope.user.userType == 'Gamer'){
//        $location.path('/');
//    }

}






