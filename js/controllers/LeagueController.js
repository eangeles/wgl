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

    //SelectedMatch
    $scope.selectedLeague = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID));

    leagueRef.on('value', function(snapshot) {
        if(snapshot.val() === null) {

        } else {
            var leagueName = snapshot.val().name;
            sharedProperties.setProperty(leagueName);
            $scope.selectedLeague = snapshot.val();
        }
    });

    $scope.addTeamToLeague = function(team) {
        team.wins =     1;
        team.losses =   1;
        $scope.selectedLeagueTeams.$add(team);
        $location.path("/league/" + $routeParams.leagueID);
    }

    $scope.addMatchToLeague = function(match) {
        $scope.selectedLeagueMatches.$add(match);
        $location.path("/league/" + $routeParams.leagueID);
    }
    
    $scope.removeLeagueMatch = function(id) {
        $scope.selectedLeagueMatches.$remove(id);
        $location.path("/league/" + $routeParams.leagueID);
    }
    
    $scope.removeLeagueTeam = function(id) {
        $scope.selectedLeagueTeams.$remove(id);
        $location.path("/league/" + $routeParams.leagueID);
    }

    //add team to league
    $scope.userTyping = false;
    $scope.selectTeam = function(team, id) {
        if (team.players) {
            $scope.team.players = team.players;
        }
        $scope.team.id = id;
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

    $scope.selectWinner = function(outcome, test){

        if($scope.match.selectWinner){
            $scope.match.selectWinner = outcome;
            console.log('winner');
        }
        if($scope.match.selectLoser){
            $scope.match.selectLoser = test;
            console.log($scope.match.selectLoser);
        }

//        console.log(outcome, test);
    }

    $scope.updateStanding = function(standing, teamID){
        var updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID + "/teams/"+ teamID);
        updateRef.update({
            wins: standing.wins,
            losses: standing.losses
        });
    }

    $scope.winSort = function(team) {
        return -team.wins;
    }

}]);





