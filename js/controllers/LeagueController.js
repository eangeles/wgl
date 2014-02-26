wgl.controller('leagues', ['$scope','$routeParams','$location','$rootScope','$firebase', 'sharedProperties', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase, sharedProperties) {

    //Match Crud
    $scope.leagues = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/"));
    $scope.teams = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/"));

    $scope.addLeague = function(league) {
        $scope.leagues.$add(league);
        $location.path("/leagues");
    };

    $scope.removeLeague = function(leagueID) {
        $scope.leagues.$remove(leagueID);
    }

    $scope.updateLeague = function(league) {
        var updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID);
        updateRef.update({
            image:  league.image,
            name:   league.name,
            season: league.season
        });
        $location.path("/leagues");
    }

    //Team specific crud
    var leagueRef = new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID);
    $scope.tempRouteParam = $routeParams.leagueID;

    //Standings
    $scope.selectedLeagueTeams = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID + "/teams"));

    //Matches
    $scope.selectedLeagueMatches = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID + "/matches"));


    //Specific Match
    $scope.selectedLeagueMatch = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID + "/matches/" + $routeParams.matchID));
    

    leagueRef.on('value', function(snapshot) {
        if(snapshot.val() === null) {

        } else {
            var leagueName = snapshot.val().name;
            sharedProperties.setProperty(leagueName);
            $scope.selectedLeague = snapshot.val();
        }
    });

    $scope.addTeamToLeague = function(team) {
        //hardcoded until we figure out how to manage them
        team.wins =     5;
        team.losses =   10;
        console.log(team);
        $scope.selectedLeagueTeams.$add(team);
        $location.path("/league/" + $routeParams.leagueID);
    }
    
    $scope.addMatchToLeague = function(match) {
        console.log(match);
        $scope.selectedLeagueMatches.$add(match);
        $location.path("/league/" + $routeParams.leagueID);
    }

    //add team to league
    $scope.userTyping = false;
    $scope.selectTeam = function(team) {
        if (team.players) {
            $scope.team.players = team.players;
        }
        $scope.team.name = angular.fromJson(angular.toJson(team.name));
        $scope.team.picture = angular.fromJson(angular.toJson(team.picture));
        $scope.userTyping = false;
    };

    //add match to league
    //Add Team Auto complete
    $scope.awayTeamTyping = false;
    //Filter user search and select to input
    $scope.selectTeamAway = function(team) {
        $scope.match.awayTeam.name = team.name;
        team.key = team.$key;
        $scope.match.awayTeam = team;
        $scope.awayTeamTyping = false;
    };

    $scope.homeTeamTyping = false;
    $scope.selectTeamHome = function(team) {
        $scope.match.homeTeam.name = team.name;
        team.key = team.$key;
        $scope.match.homeTeam = team;
        $scope.homeTeamTyping = false;
    };

}]);





