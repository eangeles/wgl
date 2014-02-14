var wgl = angular.module('WGL', ['firebase', 'ngRoute']);

wgl.run(['$firebaseSimpleLogin', '$rootScope', '$route', function($firebaseSimpleLogin, $rootScope, $route){
    var url = new Firebase("https://thewgl.firebaseio.com/");
    $rootScope.loginObj = $firebaseSimpleLogin(url);

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
            templateUrl:"partials/about.html"
        })
        .when("/gts", {
            title: 'Gamer Tracking System',
            templateUrl:"partials/gts.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/users", {
            title: 'Users',
            templateUrl:"partials/users.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/ladder", {
            title: 'Ladder',
            templateUrl:"partials/ladder.html"
        })
        .when("/leagues", {
            title: 'Leagues',
            templateUrl:"partials/leagues.html"
        })
        .when("/team", {
            title: 'Ladder',
            templateUrl:"partials/team.html"
        })
        .when("/gamer_page/:playerID", {
            title: 'Gamer Page',
            templateUrl:"partials/gamer_page.html"
        })
        .when("/upcomingmatches", {
            title: 'Upcoming Matches',
            templateUrl:"partials/upcomingmatches.html"
        })
        .when("/match/:matchID", {
            title: 'Match',
            templateUrl:"partials/match.html"
        })
        .when("/addmatch", {
            title: 'New Match',
            templateUrl:"partials/addmatch.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/editmatch/:matchID", {
            title: 'New Match',
            templateUrl:"partials/editmatch.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/tournaments", {
            title: 'Tournaments',
            templateUrl:"partials/tournament.html"
        })
        .when("/news", {
            title: 'News',
            templateUrl:"partials/news.html"
        })
        .when("/newspage/:newsItemID", {
            title: 'News Article',
            templateUrl:"partials/newspage.html"
        })
        .when("/addnews", {
            title: 'Add News',
            templateUrl:"partials/addnews.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/editnews/:newsItemID", {
            title: 'Edit News',
            templateUrl:"partials/editnews.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/teams", {
            title: 'Teams',
            templateUrl:"partials/teams.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/addteam", {
            title: 'Add Team',
            templateUrl:"partials/addteam.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/team/:teamID", {
            title: 'Team',
            templateUrl:"partials/team.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/addteammate/:teamID", {
            title: 'Add TeamMate',
            templateUrl:"partials/addteammate.html",
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
    }).filter('toArray', function () {
        'use strict';

        return function (obj) {
            if (!(obj instanceof Object)) {
                return obj;
            }

            return Object.keys(obj).filter(function(key){if(key.charAt(0) !== "$") {return key;}}).map(function (key) {
                return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
            });
        };
    }).filter('orderObjectBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field]);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    });
;

var checkPermission = function ($q, $rootScope, $location){

//    if(!$rootScope.user || $rootScope.user.userType == 'Gamer'){
//        $location.path('/');
//    }

}






