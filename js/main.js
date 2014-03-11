var wgl = angular.module('WGL', ['firebase', 'ngRoute']);

wgl.run(['$firebaseSimpleLogin', '$rootScope', '$route', 'sharedProperties', function($firebaseSimpleLogin, $rootScope, $route, sharedProperties){
    var url = new Firebase("https://thewgl.firebaseio.com/");
    $rootScope.loginObj = $firebaseSimpleLogin(url);

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

wgl.config(function ($routeProvider,$locationProvider){
//    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/" , {
            title: 'Home',
            templateUrl: "partials/home.html"
        })
        .when("/about", {
            title: 'About Us',
            templateUrl:"partials/about.html"
        })
        .when("/league/:leagueID", {
            title: 'League',
            templateUrl:"partials/league.html"
        })
        .when("/leagues", {
            title: 'Leagues',
            templateUrl:"partials/leagues.html",
            resolve: {
                factory: leaguesPermission
            }
        })
        .when("/leaguematch/:leagueID/:matchID", {
            title: 'League Match',
            templateUrl:"partials/leagueMatch.html"
        })
        .when("/team", {
            title: 'Team Page',
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
        .when("/tournament", {
            title: 'Tournament',
            templateUrl:"partials/tournament.html"
        })
        .when("/tournaments", {
            title: 'Tournaments',
            templateUrl:"partials/tournaments.html"
        })
        .when("/news", {
            title: 'News',
            templateUrl:"partials/news.html",
            resolve: {
                factory: newsPermission
            }
        })
        .when("/newspage/:newsItemID", {
            title: 'News Article',
            templateUrl:"partials/newspage.html"
        })
        .when("/team/:teamID", {
            title: 'Team',
            templateUrl:"partials/team.html"
        })
        .when("/teams", {
            title: 'Teams',
            templateUrl:"partials/teams.html",
            resolve: {
                factory: teamsPermission
            }
        })

        // ***********
        // Admin Section
        // ***********

        .when("/addleague", {
            title: 'Add League',
            templateUrl:"partials/addleague.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/editleague/:leagueID", {
            title: 'Edit League',
            templateUrl:"partials/editleague.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/leagueaddteam/:leagueID", {
            title: 'Add Team To League',
            templateUrl:"partials/leagueaddteam.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/leagueaddmatch/:leagueID", {
            title: 'Add Match To League',
            templateUrl:"partials/leagueaddmatch.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/addmatch", {
            title: 'New Match',
            templateUrl:"partials/addmatch.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/editmatch/:matchID", {
            title: 'Edit Match',
            templateUrl:"partials/editmatch.html",
            resolve: {
                factory: checkPermission
            }
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
        .when("/editteam/:teamID", {
            title: 'Edit Team',
            templateUrl:"partials/editteam.html",
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
        .when("/addteammate/:teamID", {
            title: 'Add TeamMate',
            templateUrl:"partials/addteammate.html",
            resolve: {
                factory: checkPermission
            }
        })
        .when("/stations", {
            title: 'Stations',
            templateUrl:"partials/stations.html",
            resolve: {
                factory: checkPermission
            }
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
        .when("/games", {
            title: 'Games',
            templateUrl:"partials/games.html",
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
    }).filter('isHomeGame', function() {
        return function(input, teamName) {
            var homeGames = [];
            for (var i=0;i<numMatches;i++){
                if (input[i] && input[i].homeTeam) {
                    if (input[i].homeTeam.name === teamName) {
                        homeGames.push(input[i]);
                    }
                }
            }
            return homeGames;
        };
    }).filter('isAwayGame', function() {
        return function(input, teamName) {
            var awayGames = [];
            for (var i=0;i<numMatches;i++){
                if (input[i] && input[i].awayTeam) {
                    if (input[i].awayTeam.name === teamName) {
                        awayGames.push(input[i]);
                    }
                }
            }
            return awayGames;
        };
    }).service('sharedProperties', function () {
        var leagueName = '';

        return {
            getProperty: function () {
                return leagueName;
            },
            setProperty: function(value) {
                leagueName = value;
            }
        };
});

// Checks Permission if User is Gamer/Admin, it will redirect the User if they are not
// Staff or Admin. If a user that is not logged in, tries to go to the Admin section, they
// will be redirect to the homepage.
var checkPermission = function ($q, $rootScope, $location){

    if($rootScope.loginObj.user === null){
        $location.path('/');
    }else if($rootScope.loginObj.user.userType === 'Gamer'){
        $location.path('/');
    }
}
// If the userType is Admin, Admin function will show for that page.
var newsPermission = function ($q, $rootScope, $location,$sce){
    if($rootScope.loginObj.user.userType === 'Admin'){

        $rootScope.html = '<a href="#\addnews">+</a>';
        $rootScope.addNews = $sce.trustAsHtml($rootScope.html);

        $rootScope.html2 = 'Edit';
        $rootScope.editNews = $sce.trustAsHtml($rootScope.html2);

        $rootScope.html3 = 'Remove';
        $rootScope.removeNews = $sce.trustAsHtml($rootScope.html3);
    }
}
// If the userType is Admin, Admin function will show for that page.
var leaguesPermission = function ($q, $rootScope, $location,$sce){
    if($rootScope.loginObj.user.userType === 'Admin'){
        console.log('ADMIN');

        $rootScope.html = '<a href="#\addleague">add</a>';
        $rootScope.addLeagues = $sce.trustAsHtml($rootScope.html);

        $rootScope.html2 = 'Edit';
        $rootScope.editLeagues = $sce.trustAsHtml($rootScope.html2);

        $rootScope.html3 = 'Remove';
        $rootScope.removeLeagues = $sce.trustAsHtml($rootScope.html3);
    }
}
// If the userType is Admin, Admin function will show for that page.
var teamsPermission = function ($q, $rootScope, $location,$sce){

    $rootScope.loginObj.$getCurrentUser().then(function(user){

//        console.log($rootScope.loginObj.user.userType);
        if($rootScope.loginObj.user.userType === 'Admin'){
            console.log('ADMIN');

            $rootScope.html = "<a href='#/addteam'>+</a>";
            $rootScope.addTeams = $sce.trustAsHtml($rootScope.html);

            $rootScope.html2 = 'Edit';
            $rootScope.editTeams = $sce.trustAsHtml($rootScope.html2);

            $rootScope.html3 = 'Remove';
            $rootScope.removeTeams = $sce.trustAsHtml($rootScope.html3);
        }
    });

    $rootScope.test = function(){

    }

}










