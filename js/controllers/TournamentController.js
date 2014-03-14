wgl.controller('tournaments', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //Tournament Crud
    $scope.tournaments = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/"));

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

    //Specific Match
    $scope.selectedTournamentMatch = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/" + $routeParams.tournamentID + "/" + $routeParams.matchRound + "/" + $routeParams.matchID));

    $scope.updateMatch = function(match) {
        console.log(match);
        //$scope.selectedLeagueMatches.$add(match);
        //$location.path("/tournaments");
    }

    
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





