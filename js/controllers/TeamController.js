wgl.controller('teams', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    var teamsURL = "https://thewgl.firebaseio.com/thewgl/teams/";
    $scope.teams = $firebase(new Firebase(teamsURL));
    
    $scope.addTeam = function(team) {                
        $scope.teams.$add(team);
        $location.path("/teams");
    };

    $scope.removeTeam = function(teamID) {
        $scope.teams.$remove(teamID);
    }
    
    var updateRef = "";
    $scope.updateTeam = function(post) {
        updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + $routeParams.teamID);
        updateRef.update({
            //Update Content
            //1. Array of members
            //2. Team Name
            //3. Team Picture
            //4. Upcoming matches?
        });
        $location.path("/teams");
    }
    
    $scope.retrieveTeamInfo = function(teamID) {
        $scope.team = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + teamID));
    }
    
    $scope.selectedTeam = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + $routeParams.teamID));

}]);