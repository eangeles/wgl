var numMatches;
wgl.controller('matches', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //Match Crud
    var matchesURL = "https://thewgl.firebaseio.com/thewgl/matches/";
    var teamsURL = "https://thewgl.firebaseio.com/thewgl/teams/";
    $scope.matches = $firebase(new Firebase(matchesURL));
    $scope.teams = $firebase(new Firebase(teamsURL));
    
    
    // TESTING
    //=========================
    var dataRef = new Firebase('https://thewgl.firebaseio.com/thewgl/matches/');
    dataRef.on('value', function(snapshot) {
        numMatches = snapshot.numChildren();
    });
    
    
    $scope.addMatch = function(match) { 
        console.log(match);
        $scope.matches.$add(match);
        $location.path("/upcomingmatches");
    };

    $scope.removeMatch = function(matchID) {
        $scope.matches.$remove(matchID);
    }
    
    var updateRef = "";
    $scope.updateMatch = function(match) {
        console.log(match);
        updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID);
//        updateRef.update({
//            
//        });
//        $location.path("/matches");
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

}]);





