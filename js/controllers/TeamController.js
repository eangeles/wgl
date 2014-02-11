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
        //need an update ref for players seperately
        updateRef.update({
            //Update Content
            //1. Array of members
            //2. Team Name
            //3. Team Picture
            //4. Upcoming matches?
        });
        $location.path("/teams");
    }
    
//    $scope.retreiveTeamInfo = function(teamID) {
//        console.log(teamID);
//        console.log($routeParams.teamID);
//    }
//    testing purposes
    
    $scope.selectedTeam =           $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + $routeParams.teamID));
    $scope.selectedTeamPlayers =    $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + $routeParams.teamID + "/players")); 
    
    //Team member testing
    var fakeTeam = [
        {name: "John Doe", playerID: 12345566},
        {name: "Jane Doe", playerID: 12534534},
        {name: "Mary Doe", playerID: 34523451}
    ];
    
    $scope.addFakeTeam = function() {
        $scope.selectedTeamPlayers.$set(fakeTeam);
    }
    
    $scope.addToFakeTeam = function() {
        var item = {name: "Michael", playerID: 234346876};
        $scope.selectedTeamPlayers.$add(item);
    }

}]);













