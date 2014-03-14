wgl.controller('tournaments', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //Tournament Crud
    $scope.tournaments = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/tournaments/"));
    $scope.teams = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/"));

    $scope.addTournament = function(tournament) {
        tournament.firstRound = [
            {
                homeTeam: {
                    name: "Placeholder Home Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                awayTeam: {
                    name: "Placeholder Away Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                date: "01/02/2014"
            },
            {
                homeTeam: {
                    name: "Placeholder Home Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                awayTeam: {
                    name: "Placeholder Away Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                date: "01/02/2014"
            },
            {
                homeTeam: {
                    name: "Placeholder Home Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                awayTeam: {
                    name: "Placeholder Away Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                date: "01/02/2014"
            },
            {
                homeTeam: {
                    name: "Placeholder Home Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                awayTeam: {
                    name: "Placeholder Away Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                date: "01/02/2014"
            }
        ];
        tournament.secondRound = [
            {
                homeTeam: {
                    name: "Placeholder Home Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                awayTeam: {
                    name: "Placeholder Away Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                date: "01/02/2014"
            },
            {
                homeTeam: {
                    name: "Placeholder Home Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                awayTeam: {
                    name: "Placeholder Away Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                date: "01/02/2014"
            }
        ];
        tournament.thirdRound = [
            {
                homeTeam: {
                    name: "Placeholder Home Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                awayTeam: {
                    name: "Placeholder Away Team",
                    bio: "",
                    wins: 0,
                    losses: 0,
                    picture: "",
                    key: "",
                    players: {}
                },
                date: "01/02/2014"
            }
        ];
        console.log(tournament);
        $scope.tournaments.$add(tournament);
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
        tournyMatchRef.update({
                homeTeam: {
                    name:       match.homeTeam.name,
                    picture:    match.homeTeam.picture
                },
                date: match.date,
                awayTeam: {
                    name:       match.awayTeam.name,
                    picture:    match.awayTeam.picture 
                }
        });
        $location.path("/tournaments");
    }

    
    //Add Team Auto complete
    $scope.awayTeamTyping = false;
    //Filter user search and select to input
    $scope.updateTeamAway = function(team) {
        $scope.selectedTournamentMatch.awayTeam.name = angular.fromJson(angular.toJson(team.name));
        $scope.selectedTournamentMatch.awayTeam = angular.fromJson(angular.toJson(team));
        $scope.awayTeamTyping = false;
    };

    $scope.homeTeamTyping = false;
    $scope.updateTeamHome = function(team) {
        $scope.selectedTournamentMatch.homeTeam.name = angular.fromJson(angular.toJson(team.name));
        $scope.selectedTournamentMatch.homeTeam = angular.fromJson(angular.toJson(team));
        $scope.homeTeamTyping = false;
    };

}]);





