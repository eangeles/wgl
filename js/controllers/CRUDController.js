wgl.controller('gameController', ['$scope','$firebase','$location', function($scope,$firebase,$location) {
	var urlGames = "https://thewgl.firebaseio.com/thewgl/games";
    
    //collects the info from the database for use.
    $scope.games = $firebase(new Firebase(urlGames));
    
    var isGameSaveClicked = false;
	//create a game and adds it to the database
	$scope.saveGame = function(game) {
        if (isGameSaveClicked) {
            if (game == "" || game == null) {
                console.log("game does not exist");
            } else {
                //error checking for if fields are null
                if (game.gameSystem == "" || game.gameSystem == null) { //System
                    console.log("No game system given");
                } else if (game.gameTitle == "" || game.gameTitle == null) { //Game Title
                    console.log("No game title given");
                } else if (game.gameArtUrl == "" || game.gameArtUrl == null) { // Game Box Art
                    console.log("No game art url given");
                } else if (game.gameQuantity == "" || game.gameQuantity == null) { //Quantity
                    console.log("No game quantity given");
                } else {
                    console.log(game);
                    $scope.games.$add(game);
                    $location.path("/gts");
                }
            } //end if else
            $("#add_game_btn").css({backgroundColor: "#17A9CC"}).html("Save");
            isGameSaveClicked = false;
        } else {
            $("#add_game_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isGameSaveClicked = true;
        }
	} //end addGame

    var isGameUpdateClicked = false;
    $scope.updateGame = function(game){
        if (isGameUpdateClicked) {
            if (game == "" || game == null) {
                console.log("game does not exist");
            } else {
                //error checking for if fields are null
                if (game.gameSystem == "" || game.gameSystem == null) { //System
                    console.log("No game system given");
                } else if (game.gameTitle == "" || game.gameTitle == null) { //Game Title
                    console.log("No game title given");
                } else if (game.gameArtUrl == "" || game.gameArtUrl == null) { // Game Box Art
                    console.log("No game art url given");
                } else if (game.gameQuantity == "" || game.gameQuantity == null) { //Quantity
                    console.log("No game quantity given");
                } else {
                    var updateRef = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/games/"+ game.id));
                    updateRef.$set({
                        gameArtUrl: game.gameArtUrl,
                        gameQuantity: game.gameQuantity,
                        gameSystem: game.gameSystem,
                        gameTitle: game.gameTitle
                    });
                    $location.path("/gts");
                }
            } //end if else
            $("#update_game_btn").css({backgroundColor: "#17A9CC"}).html("Update");
            isGameUpdateClicked = false;
        } else {
            $("#update_game_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isGameUpdateClicked = true;
        }

    }

    var isGameDeletedClicked = false;
    //removes from firebase
    $scope.deleteGame = function(game){
        if (isGameDeletedClicked) {
            console.log(game.id);
            var stationURL = new Firebase("https://thewgl.firebaseio.com/thewgl/games/" + game.id);
            var deleteRef = $firebase(stationURL);
            //deleteRef.$remove();
            $("#delete_game_btn").css({backgroundColor: "#17A9CC"}).html("Delete");
            $location.path("/gts");
            isGameDeletedClicked = false;
        } else {
            $("#delete_game_btn").css({backgroundColor: "#ff0000"}).html("Are you sure?");
            isGameDeletedClicked = true;
        }
    }

    $scope.typing = false;
    $scope.selectGame = function(game,index) {
        $scope.tempGame = game;
        $scope.tempGame.id = index;
        $scope.typing = false;
    };
}]);


//Station Crud
wgl.controller('stationController', ['$scope','$firebase','$location', function($scope,$firebase,$location) {
	//urls to the data needed
	var urlStations = "https://thewgl.firebaseio.com/thewgl/stations";
	var urlEmptyStations = "https://thewgl.firebaseio.com/thewgl/emptyStations";
	//collects the info from the database for use.
    $scope.stations = $firebase(new Firebase(urlStations));
    $scope.emptyStations = $firebase(new Firebase(urlEmptyStations));
    
    var isStationSaveClicked = false;
    $scope.saveStation = function(station){
        if (isStationSaveClicked) {
            console.log(station);
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
                    $scope.stations.$add(station);
                    $scope.emptyStations.$add({
                        "stationNumber": station.stationNumber,
                        "stationSystem": station.stationSystem
                    });
                }
            }
            $("#save_station_btn").css({backgroundColor: "#17A9CC"}).html("Add");
            isStationSaveClicked = false;
        } else {
            $("#save_station_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isStationSaveClicked = true;
        }
    }
    
    var isUpdateStationClicked = false;
    $scope.updateStation = function(station){
        //find a way to update both emptyStations and stations
        if (isUpdateStationClicked) {
            $("#update_station_btn").css({backgroundColor: "#17A9CC"}).html("Update");
            var stationURL = new Firebase("https://thewgl.firebaseio.com/thewgl/stations/" + station.id);
            var updateRef = $firebase(stationURL);
            updateRef.$set(station);
            $location.path("/gts");
            isUpdateStationClicked = false;
        } else {
            $("#update_station_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isUpdateStationClicked = true;
        }
    }

    var isDeleteStationClicked = false;
    $scope.deleteStation = function(station){
        if (isDeleteStationClicked) {
            console.log(station.id);
            var stationURL = new Firebase("https://thewgl.firebaseio.com/thewgl/stations/" + station.id);
            var deleteRef = $firebase(stationURL);
            deleteRef.$remove();
            //Also should delete from emptystations
            $("#delete_station_btn").css({backgroundColor: "#ff0000"}).html("Delete");
            isDeleteStationClicked = false;
        } else {
            $("#delete_station_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isDeleteStationClicked = true;
        }
    }

    //When typing on station, this is the auto complete
    $scope.typing = false;
    $scope.limit = 5;
    $scope.selectStation = function(station, index) {
        //sets all the selected station properties into the scope variable on the form
        //and also adds in the id so we can use it to access later
        $scope.tempStation = station;
        $scope.tempStation.id = index;
        $scope.typing = false;
    };

}]);