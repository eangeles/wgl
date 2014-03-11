wgl.controller('tournaments', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //Match Crud
    $scope.tournaments = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/"));

    $scope.addLeague = function(tournament) {
        $scope.tournaments.$add(tournament);
        $location.path("/tournaments");
    };

    $scope.removeTournament = function(tournamentID) {
        $scope.tournaments.$remove(tournamentID);
    }

    $scope.updateTournament = function(tournament) {
        var updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID);
        updateRef.update({
            image:  league.image,
            name:   league.name,
            season: league.season
        });
        $location.path("/tournaments");
    }

    //Team specific crud
    var tournamentRef = new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID);
    $scope.tempRouteParam = $routeParams.leagueID;

    //Standings
    $scope.selectedTournamentTeams = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID + "/teams"));

    //Matches
    $scope.selectedTournamentMatches = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID + "/matches"));


    //Specific Match
    $scope.selectedLeagueMatch = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.leagueID + "/matches/" + $routeParams.matchID));


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

    $scope.selectWinner = function(outcome, test){

        if($scope.match.selectWinner){
            $scope.match.selectWinner = outcome;
            console.log('winner');
        }
        if($scope.match.selectLoser){
            $scope.match.selectLoser = test;
            console.log($scope.match.selectLoser);
        }

        console.log(outcome, test);
    }

    $scope.updateStanding = function(standing, teamID){
        var updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID + "/teams/"+ teamID);
        updateRef.update({
            wins: standing.wins,
            losses: standing.losses
        });
    }

}]);





