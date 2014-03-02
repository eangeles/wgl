wgl.controller('gameController', ['$scope','$firebase','$location', function($scope,$firebase,$location) {
	var urlGames = "https://thewgl.firebaseio.com/thewgl/games";
    
    //collects the info from the database for use.
    $scope.games = $firebase(new Firebase(urlGames));
    
    var isGameSaveClicked = false;
	//create a game and adds it to the database
	$scope.saveGame = function(game) {
        $scope.games.$add(game);
        $location.path("/gts");

//        if (isGameSaveClicked) {
//            if (game == "" || game == null) {
//                console.log("game does not exist");
//            } else {
//                //error checking for if fields are null
//                if (game.gameSystem == "" || game.gameSystem == null) { //System
//                    console.log("No game system given");
//                } else if (game.gameTitle == "" || game.gameTitle == null) { //Game Title
//                    console.log("No game title given");
//                } else if (game.gameArtUrl == "" || game.gameArtUrl == null) { // Game Box Art
//                    console.log("No game art url given");
//                } else if (game.gameQuantity == "" || game.gameQuantity == null) { //Quantity
//                    console.log("No game quantity given");
//                } else {
//                    console.log(game);
//                    $scope.games.$add(game);
//                    $location.path("/games");
//                }
//            } //end if else
//            $("#add_game_btn").css({backgroundColor: "#17A9CC"}).html("Save");
//            isGameSaveClicked = false;
//        } else {
//            $("#add_game_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
//            isGameSaveClicked = true;
//        }
	} //end addGame

    $scope.updateGame = function(game){
        console.log(game.id);
        var updateRef = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/games/"+ game.id));
        updateRef.$set({
            gameArtUrl: game.gameArtUrl,
            gameQuantity: game.gameQuantity,
            gameSystem: game.gameSystem,
            gameTitle: game.gameTitle
        });

    }

    var isGameDeletedClicked = false;
    //removes from firebase
    $scope.deleteGame = function(game){
        if (isGameDeletedClicked) {
            $("#delete_game_btn").html("Delete");
            isGameDeletedClicked = false;
            $scope.games.$remove(game.$id);
        } else {
            $("#delete_game_btn").html("Are you sure?");
            isGameDeletedClicked = true;
        }
    }

    $scope.typing = false;
    $scope.selectGame = function(game) {
        $scope.gameInfos.gameTitle = game.gameTitle;
        $scope.gameInfos.gameSystem = game.gameSystem;
        $scope.gameInfos.gameArtUrl = game.gameArtUrl;
        $scope.gameInfos.gameQuantity = game.gameQuantity;
<<<<<<< HEAD
//        $scope.gameInfos.id = gameId;
//        console.log(gameId);
=======
        $scope.gameInfos.id = gameId;
>>>>>>> 4c66aef9bb744a5fb39b4ca7dd50e05e18bd9d09
        $scope.typing = false;
    };
}]);


//Station Crud
wgl.controller('stationController', ['$scope','$firebase','$location','$rootScope', function($scope,$firebase,$location,$rootScope) {
	//urls to the data needed
	var urlStations = "https://thewgl.firebaseio.com/thewgl/stations";
	var urlEmptyStations = "https://thewgl.firebaseio.com/thewgl/emptyStations";
	//collects the info from the database for use.
    $scope.stations = $firebase(new Firebase(urlStations));
    $scope.emptyStations = $firebase(new Firebase(urlEmptyStations));
    
    var isStationSaveClicked = false;
    $scope.saveStation = function(station){
        if (isStationSaveClicked) {
            // If new station, new station will be added to firebase
            if(station.stationNumber === "New Station")
            {
                if (station == "" || station == null) {
                    console.log("Station does not exist");
                } else {
                    if (station.stationSystem == "" || station.stationSystem == null) { // The Station System
                        console.log("No SystemTV given");
                    } else if (station.stationTV == "" || station.stationTV == null) { //Station TV
                        console.log("Please enter a TV");
                    } else if (station.stationTVSerial == "" || station.stationTVSerial == null) { //TV's Serial
                        console.log("Please enter a TV Serial");
                    } else {
                        //need to find a way to get a stationNumber
                        station.stationNumber = 1;
                        console.log(station);
                        $scope.stations.$add(station);
                        $scope.emptyStations.$add({
                            "stationNumber": station.stationNumber, 
                            "stationSystem": station.stationSystem
                        });
                    }
                } //end if else
            } else if(typeof station !== 'undefined') {   
                //If not new station, form will validate instead.
                $scope.stations.update(station.$id);
            }
            $("#save_station_btn").css({backgroundColor: "#17A9CC"}).html("Save");
            isStationSaveClicked = false;
        } else {
            $("#save_station_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isStationSaveClicked = true;
        }
        

    }

    var isDeleteStationClicked = false;
    //removes the station from firebase
    $scope.deleteStation = function(station){
        if (isDeleteStationClicked) {
            $scope.stations.remove(station.$id);
            //Also deletes from emptystations
            for (var i= 0,max=$scope.emptyStations.length;i<max;i++) {
                if ($scope.emptyStations[i].stationNumber == station.stationNumber) {
                    $scope.emptyStations.remove($scope.emptyStations[i].$id);
                }
            } 
            $("#delete_station_btn").css({backgroundColor: "#ff0000"}).html("Delete");
            isDeleteStationClicked = false;
        } else {
            $("#delete_station_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isDeleteStationClicked = true;
        }
}
    //Station Firebase information
    $scope.stationInfos = function(info){
        $rootScope.stationInfos = $scope.stations[info];

        console.log(info);
    }

    $scope.typing = false;
    $scope.selectStation = function(station) {
        station.key = station.$key;
        $scope.stationInfos.stationNumber = station.stationNumber;
        $scope.typing = false;

        console.log(station);
    };

}]);