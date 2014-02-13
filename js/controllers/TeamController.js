wgl.controller('teams', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //TeamCrud
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

    //auto complete
    $scope.userTyping = false;
    //Filter user search and select to input
    $scope.limit = 5;
    $scope.selectTeam = function (team) {
        id = team.$id;
        ref = team.$ref;
        $scope.match = angular.fromJson(angular.toJson(team));
        $scope.match.$id = id;
        $scope.match.$ref = ref;
        $scope.userTyping = false;
        console.log(team);
    };
    //auto complete
    $scope.userTypingB = false;
    //Filter user search and select to input
    $scope.limit = 5;
    $scope.selectTeamHome = function (team) {
        id = team.$id;
        ref = team.$ref;
        $scope.match = angular.fromJson(angular.toJson(team));
        $scope.match.$id = id;
        $scope.match.$ref = ref;
        $scope.userTypingB = false;
        console.log(team);
    };


}]);













