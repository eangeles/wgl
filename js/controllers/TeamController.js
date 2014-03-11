wgl.controller('teams', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //TeamCrud
    var teamsURL = "https://thewgl.firebaseio.com/thewgl/teams/";
    $scope.teams = $firebase(new Firebase(teamsURL));
    
    $scope.addTeam = function(team) { 
        console.log(team);
        $scope.teams.$add(team);
        $location.path("/teams");
    };

    $scope.removeTeam = function(teamID) {
        console.log(teamID);
        $scope.teams.$remove(teamID);
    }
    
    $scope.updateTeam = function(team) {
        var updateRef = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + $routeParams.teamID));
        console.log(team.bio, team.name, team.picture);
        updateRef.$set({
            bio:      team.bio,
            name:     team.name,
            picture:  team.picture
        });
        $location.path("/teams");
    }
    
    //Team Specific crud
    $scope.selectedTeam =           $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + $routeParams.teamID));
    $scope.selectedTeamPlayers =    $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/teams/" + $routeParams.teamID + "/players"));
    $scope.selectedTeamID =         $routeParams.teamID;
    
    //Player Specific crud for gamer pages
    $scope.selectedPlayer =         $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/users/" + $routeParams.playerID));
    
    $scope.addPlayerToTeam = function(teamMember) {
        $scope.selectedTeamPlayers.$add(teamMember);
        $location.path("/team/" + $routeParams.teamID);
    }
    
    $scope.removePlayerFromTeam = function(memberID) {
        $scope.selectedTeamPlayers.$remove(memberID);
    }

    $scope.teamSort = function(team) {
        return -team.wins;
    }

    //Add Team Auto complete
    $scope.userTyping = false;
    $scope.selectTeam = function (team) {
        id = team.$id;
        ref = team.$ref;
        $scope.team.name = angular.fromJson(angular.toJson(team.name));
        $scope.team.picture = angular.fromJson(angular.toJson(team.picture));
        $scope.team.name.$id = id;
        $scope.team.name.$ref = ref;
        $scope.userTyping = false;
        console.log( $scope.team.picture);
    };


}]);













