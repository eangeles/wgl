wgl.controller('matches', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

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
        console.log(match);
        updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID);
        //updateRef.update({
            
        //});
        //$location.path("/matches");
    }
    
    //Team specific crud
    $scope.selectedMatch =           $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID));

    $scope.awayTeamTyping = false;
    //Filter user search and select to input
    $scope.selectTeamAway = function (team) {
        id = team.$id;
        ref = team.$ref;
        $scope.match.awayTeam.name = team.name;
        $scope.match.awayTeam = team;
        $scope.match.awayTeam.$id = id;
        $scope.match.awayTeam.$ref = ref;
        $scope.awayTeamTyping = false;
    };

    $scope.homeTeamTyping = false;
    //Filter user search and select to input
    $scope.selectTeamHome = function (team) {
        id = team.$id;
        ref = team.$ref;
        $scope.match.homeTeam.name = team.name;
        $scope.match.homeTeam = team;
        $scope.match.homeTeam.$id = id;
        $scope.match.homeTeam.$ref = ref;
        $scope.homeTeamTyping = false;
    };
    
    
    //Filter user search and select to input
    $scope.updateTeamAway = function (team) {
        id = team.$id;
        ref = team.$ref;
        $scope.selectedMatch.awayTeam.name = team.name;
        $scope.selectedMatch.awayTeam = team;
        $scope.selectedMatch.awayTeam.$id = id;
        $scope.selectedMatch.awayTeam.$ref = ref;
        $scope.awayTeamTyping = false;
    };
    
    //Filter user search and select to input
    $scope.updateTeamHome = function (team) {
        id = team.$id;
        ref = team.$ref;
        $scope.selectedMatch.homeTeam.name = team.name;
        $scope.selectedMatch.homeTeam = team;
        $scope.selectedMatch.homeTeam.$id = id;
        $scope.selectedMatch.homeTeam.$ref = ref;
        $scope.homeTeamTyping = false;
    };

}]);













