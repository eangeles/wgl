wgl.controller('matches', ['$scope','$routeParams','$location','$rootScope','$firebase', 'sharedProperties', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase, sharedProperties) {

    //Match Crud
    var matchesURL = "https://thewgl.firebaseio.com/thewgl/matches/";
    var teamsURL = "https://thewgl.firebaseio.com/thewgl/teams/";
    $scope.matches = $firebase(new Firebase(matchesURL));
    $scope.teams = $firebase(new Firebase(teamsURL));
    
    $scope.addMatch = function(match) { 
        $scope.matches.$add(match);
        $location.path("/upcomingmatches");
    };

    $scope.removeMatch = function(matchID) {
        $scope.matches.$remove(matchID);
    }
    
    var updateRef = "";
    $scope.updateMatch = function(match) {
        updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID);
    }
    
    //Team specific crud
    $scope.selectedMatch = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID));

    //Add Team Auto complete
    $scope.awayTeamTyping = false;
    //Filter user search and select to input
    $scope.selectTeamAway = function (team) {
        $scope.match.awayTeam.name = team.name;
        team.key = team.$key;
        $scope.match.awayTeam = team;
        $scope.awayTeamTyping = false;
    };

    $scope.homeTeamTyping = false;
    $scope.selectTeamHome = function (team) {
        $scope.match.homeTeam.name = team.name;
        team.key = team.$key;
        $scope.match.homeTeam = team;
        $scope.homeTeamTyping = false;
    };
    
    //Update Team Auto complete
    $scope.updateTeamAway = function(team) {
        $scope.selectedMatch.awayTeam.name = team.name;
        $scope.selectedMatch.awayTeam = team;
        $scope.awayTeamTyping = false;
    };

    $scope.updateTeamHome = function(team) {
        $scope.selectedMatch.homeTeam.name = team.name;
        $scope.selectedMatch.homeTeam = team;
        $scope.homeTeamTyping = false;
    };

    $scope.url ='http://localhost:8888/wgl/#/match/' + $routeParams.matchID;
    $scope.uniqueID = $routeParams.matchID;
    $scope.matchCategory = 1111;
    $scope.title = $routeParams.matchID;


}]);








