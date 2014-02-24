wgl.controller('gameController', ['$scope', function($scope) {
	var urlGames = "https://wgl.firebaseio.com/wgl/games";
    
    //collects the info from the database for use.
    $scope.games = $firebase(new Firebase(urlGames));

//    var id;
    $scope.typing = false;
    $scope.limit = 5;
    //Select Game from search input
    $scope.selectGame = function(game){
        id = game.$id;
        ref = game.$ref;
        $scope.gameInfos = angular.fromJson(angular.toJson(game));
        $scope.gameInfos.$id = id;
        $scope.gameInfos.$ref = ref;
        $scope.typing = false;
    }

    var isGameSaveClicked = false;
	//create a game and adds it to the database
	$scope.saveGame = function(info) {
        if (isGameSaveClicked) {
            if($scope.selectGames === "New Game"){
                if ($scope.gameInfos == "" || $scope.gameInfos == null) {
                    console.log("game does not exist");
                } else {
                    //error checking for if fields are null
                    if ($scope.gameInfos.gameSystem == "" || $scope.gameInfos.gameSystem == null) { //System
                        console.log("No game system given");
                    } else if ($scope.gameInfos.gameTitle == "" || $scope.gameInfos.gameTitle == null) { //Game Title
                        console.log("No game title given");
                    } else if ($scope.gameInfos.gameArtUrl == "" || $scope.gameInfos.gameArtUrl == null) { // Game Box Art
                        console.log("No game art url given");
                    } else if ($scope.gameInfos.gameQuantity == "" || $scope.gameInfos.gameQuantity == null) { //Quantity
                        console.log("No game quantity given");
                    } else {
                        $scope.games.add($scope.gameInfos); //Adds to Firebase;
                        console.log('new');
                    }
                } //end if else
                console.log('new game added');
            }else {
                $scope.games.update($scope.gameInfos);
            }
            $("#add_game_btn").css({backgroundColor: "#17A9CC"}).html("Save");
            isGameSaveClicked = false;
        } else {
            $("#add_game_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isGameSaveClicked = true;
        }
	} //end addGame

    var isGameDeletedClicked = false;
    //removes from firebase
    $scope.deleteGame = function(game){
        if (isGameDeletedClicked) {
            $("#delete_game_btn").html("Delete");
            isGameDeletedClicked = false;
            $scope.games.remove(game.$id);
        } else {
            $("#delete_game_btn").html("Are you sure?");
            isGameDeletedClicked = true;
        }
    }
}]);


//Station Crud
wgl.controller('stationController', ['$scope','$firebase','$location', function($scope,$firebase,$location) {
	//urls to the data needed
	var urlStations = "https://wgl.firebaseio.com/wgl/stations";
	var urlEmptyStations = "https://wgl.firebaseio.com/wgl/emptyStations";
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
                        console.log("new station");
                        //hard coded until we find the right way to implement
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
                console.log("update station");
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
    $scope.stationInfo = function(info){
        $rootScope.stationInfos = $scope.stations[info];
    }

}]);