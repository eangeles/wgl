wgl.controller('leagues', ['$scope','$routeParams','$location','$rootScope','$firebase', 'sharedProperties', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase, sharedProperties) {

    //Match Crud
    $scope.leagues = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/")); 
    
    $scope.addLeague = function(league) { 
        $scope.leagues.$add(league);
        $location.path("/leagues");
    };

    $scope.removeLeague = function(leagueID) {
        $scope.leagues.$remove(leagueID);
    }
    
    $scope.updateLeague = function(league) {
        var updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID);
        updateRef.update({
            image:  league.image,
            name:   league.name,
            season: league.season
        });
        $location.path("/leagues");
    }
    
    //Team specific crud
    var leagueRef = new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID);
    $scope.selectedLeague = $firebase(leagueRef);
    $scope.selectedLeagueTeams = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID + "/teams"));
    
    leagueRef.on('value', function(snapshot) {
        if(snapshot.val() === null) {
            //console.log("nothing recieved");
        } else {
            var leagueName = snapshot.val().name;
            sharedProperties.setProperty(leagueName);
            //console.log(sharedProperties.getProperty());
        }
    });
    
    $scope.addTeamToEvent = function(team) {
        console.log(team);
        $scope.selectedLeagueTeams.$add(team);
    }

}]);





