wgl.controller('leagues', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    //Match Crud
    var leaguesURL = "https://thewgl.firebaseio.com/thewgl/leagues/";
    $scope.leagues = $firebase(new Firebase(leaguesURL));
    
    $scope.addLeague = function(league) { 
        $scope.leagues.$add(league);
        $location.path("/leagues");
    };

    $scope.removeLeague = function(leagueID) {
        $scope.leagues.$remove(leagueID);
    }
    
    $scope.updateLeague = function(league) {
        console.log(league);
        var updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID);
        updateRef.update({
            image: league.image,
            name: league.name,
            season: league.season
        });
        $location.path("/leagues");
    }
    
    //Team specific crud
    $scope.selectedLeague = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/leagues/" + $routeParams.leagueID));

}]);





