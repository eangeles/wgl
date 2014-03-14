wgl.controller('tournaments', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //Tournament Crud
    $scope.tournaments = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/"));
    $scope.teams = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/"));

    $scope.addTournament = function(tournament) {
        tournament.firstRound = [
            {
                homeTeam: {name: "Placeholder Home Team"},
                awayTeam: {name: "Placeholder Away Team"},
                date: "01/02/2014"
            },
            {
                homeTeam: {name: "Placeholder Home Team"},
                awayTeam: {name: "Placeholder Away Team"},
                date: "01/02/2014"
            },
            {
                homeTeam: {name: "Placeholder Home Team"},
                awayTeam: {name: "Placeholder Away Team"},
                date: "01/02/2014"
            },
            {
                homeTeam: {name: "Placeholder Home Team"},
                awayTeam: {name: "Placeholder Away Team"},
                date: "01/02/2014"
            }
        ];
        tournament.secondRound = [
            {
                homeTeam: {name: "Placeholder Home Team"},
                awayTeam: {name: "Placeholder Away Team"},
                date: "01/02/2014"
            },
            {
                homeTeam: {name: "Placeholder Home Team"},
                awayTeam: {name: "Placeholder Away Team"},
                date: "01/02/2014"
            }
        ];
        tournament.thirdRound = [
            {
                homeTeam: {name: "Placeholder Home Team"},
                awayTeam: {name: "Placeholder Away Team"},
                date: "01/02/2014"
            }
        ];
        console.log(tournament);
        $location.path("/tournaments");
    };

    $scope.removeTournament = function(tournamentID) {
        $scope.tournaments.$remove(tournamentID);
    }

    $scope.updateTournament = function(tournament) {
        var updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID);
        updateRef.update({
            name:       tournament.name,
            image:      tournament.image,
            startDate:  tournament.startDate,
            endDate:    tournament.endDate
        });
        $location.path("/tournaments");
    }

    //Standings
    $scope.selectedTournament = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID));
    
    $scope.tournyID = $routeParams.tournamentID;

    //Specific Match
    var tournyMatchRef = new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID + "/" + $routeParams.matchRound + "/" + $routeParams.matchID);
    $scope.selectedTournamentMatch = $firebase(tournyMatchRef);

    $scope.updateMatch = function(match) {
        console.log(match);
        tournyMatchRef.update(match);
//        $location.path("/tournaments");
    }

    
    //Add Team Auto complete
    $scope.awayTeamTyping = false;
    //Filter user search and select to input
    $scope.updateTeamAway = function(team) {
        $scope.selectedTournamentMatch.awayTeam.name = team.name;
        team.key = team.$key;
        $scope.selectedTournamentMatch.awayTeam = team;
        $scope.awayTeamTyping = false;
    };

    $scope.homeTeamTyping = false;
    $scope.updateTeamHome = function(team) {
        $scope.selectedTournamentMatch.homeTeam.name = team.name;
        team.key = team.$key;
        $scope.selectedTournamentMatch.homeTeam = team;
        $scope.homeTeamTyping = false;
    };

}]);





