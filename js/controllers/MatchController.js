wgl.controller('matches', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //Match Crud
    var matchesURL = "https://thewgl.firebaseio.com/thewgl/matches/";
    $scope.matches = $firebase(new Firebase(matchesURL));
    
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
        updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID);
        //need an update ref for players seperately
        updateRef.update({
            //Update Content
        });
        $location.path("/matches");
    }
    
    //Team specific crud
    $scope.selectedMatch =           $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID));
    //$scope.selectedTeamPlayers =    $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/matches/" + $routeParams.matchID + "/players"));
    //$scope.selectedTeamID =         $routeParams.teamID;

}]);












