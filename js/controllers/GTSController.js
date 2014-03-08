wgl.controller('gts', ['$scope','$routeParams','$firebase','$location','$timeout', function mtCtrl($scope, $routeParams,$firebase,$location,$timeout){
    
    //Testing Integrating the Auto complete functionality
    $scope.gameTyping = false;
    $scope.userTyping = false;
    $scope.limit = 5;

    //Select User from search input
    $scope.selectUser = function (gamer) {
        $scope.tempStation.name = angular.fromJson(angular.toJson(gamer.name));
        $scope.userTyping = false;
    };

    //Select Game from search input
    $scope.selectGame = function(game){
        $scope.tempStation.game = angular.fromJson(angular.toJson(game.gameTitle));
        $scope.tempStation.gameArt = angular.fromJson(angular.toJson(game.gameArtUrl));
        $scope.gameTyping = false;
    }


    //Setting scope to use with the autocomplete
    var urlGames = "https://thewgl.firebaseio.com/thewgl/games";
    var urlUsers = "https://thewgl.firebaseio.com/thewgl/users";
    
    $scope.games = $firebase(new Firebase(urlGames));
    $scope.users = $firebase(new Firebase(urlUsers));
    
    //general overall function for the page to run
    var wrapper = function () {
        updateTimer();
        $timeout(wrapper, 5000);
    }    

    //variables used in updateTimer function
    var time,alert;
    
    //timer event that runs through all the active stations and basically updates
    //all the timers with the correct time by calculating the change in time between
    //start time and the display time and reflects that in the html.
    /*
     * move keys up here?
     * move loaded event up into the wrapper function?
     */
    var updateTimer = function(){
        $scope.activeStations.$on('loaded', function() {
            var keys = $scope.activeStations.$getIndex();

            // or as a for loop
            for(var i=0, len = keys.length; i < len; i++) {
                time = new Date().getTime() - $scope.activeStations[keys[i]].startTime;
                $scope.activeStations[keys[i]].displayTime = parseInt($scope.activeStations[keys[i]].countdown - (time/1000/60));
                if($scope.activeStations[keys[i]].displayTime <= 0){ 
                    var alert = {
                        "user": $scope.activeStations[keys[i]].name,
                        "stationNumber": $scope.activeStations[keys[i]].stationNumber
                    }
                    $scope.addAlert(alert);
                    $scope.emptyStations.$add({
                        "stationNumber": $scope.activeStations[keys[i]].stationNumber, 
                        "stationSystem": $scope.activeStations[keys[i]].stationSystem
                    });
                    $scope.activeStations.$remove(keys[i]);
                }
            }
            
        });
    };
    
    //************************************Active stations database***************************************************
    var urlActiveStations = new Firebase('https://thewgl.firebaseio.com/thewgl/activeStations'); 
    
    urlActiveStations.on('value', function(snapshot) {
        $scope.activeStations = $firebase(urlActiveStations);
        //starts the clocks
        var startKillWatch = $scope.$watch('activeStations', function(){
            $timeout(wrapper);
            startKillWatch();
        });
    });
    
    var isActiveClicked = false;
    //create a active station and adds it to the database
    $scope.addActiveStation = function(tempActiveStation){
        if (isActiveClicked){
            tempActiveStation.startTime = new Date().getTime();

            //Set to override the countdown dropdown
            tempActiveStation.countdown = 2;
            
            //When adding to active it loops through the empty stations and finds that
            //corresponding station and removes it so it only shows in activeStations
            var keys = $scope.emptyStations.$getIndex();
            
            for (var i=0, len = keys.length; i < len; i++) {
                if ($scope.emptyStations[keys[i]].stationNumber == tempActiveStation.stationNumber) {
                    
                    var index = keys[i];
                    
                    $scope.emptyStations.$remove(index);
                    tempActiveStation.stationSystem = $scope.emptyStations[keys[i]].stationSystem;
                }
            }  
          
            $scope.activeStations.$add(tempActiveStation);
            
            $("#add_active_btn").css({backgroundColor: "#17A9CC"}).html("Start");
            isActiveClicked = false;
        } else {
            $("#add_active_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
            isActiveClicked = true;
        }
    }
    
    //Removes station from active and adds to empty
    $scope.removeActiveStation = function(station) {
        $scope.activeStations.$remove(station.$id);
        
        var tempEmptyStation = {
            "stationNumber": station.stationNumber,
            "stationSystem": station.stationSystem
        };
        
        $scope.emptyStations.$add(tempEmptyStation);
    }
    
    //************************************Empty stations database***************************************************
    var urlEmptyStations = 'https://thewgl.firebaseio.com/thewgl/emptyStations';
    
    $scope.emptyStations = $firebase(new Firebase(urlEmptyStations));
    
    //*******************************************Alerts database****************************************************
    var urlAlerts = 'https://thewgl.firebaseio.com/thewgl/alerts';
    
    $scope.alerts = $firebase(new Firebase(urlAlerts));
    
    $scope.addAlert = function(alert) {
        if (alert.stationNumber && alert.user) {
            console.log(alert.stationNumber, alert.user);
            $scope.alerts.$add(alert);
        }
    }
    
    $scope.removeAlert = function(alertID) {
        console.log(alertID);
        //$scope.alerts.$remove(alertID);
    }
    
    //******************************************Queue database*******************************************************
    var urlPlayerQueue = "https://thewgl.firebaseio.com/thewgl/playerQueue";
    
    $scope.playerQueue = $firebase(new Firebase(urlPlayerQueue));
    
    var isQueueClicked = false;
    //make a var for queue button so its reusable?
    $scope.addToPlayerQueue = function(playerRequest) { 
        if (isQueueClicked){
            //Grabs a date and seperates it into hours and minutes
            var d = new Date();
            
            var origHours = d.getHours();
            var origMin =   d.getMinutes();
            var formatHours, formatMinutes;
            
            //adds in zeros to variables where needed
            if (origHours > 12) {
                formatHours = origHours - 12;
            } else if (origHours == 0) {
                formatHours = 12;
            } else {
                formatHours = origHours;
            }
            
            if (origMin < 10) {
                formatMinutes = "0" + origMin;
            } else {
                formatMinutes = origMin;
            }
            
            //Throws both new variables into and array and joins them together with ":"
            var dformat = [formatHours, formatMinutes].join(":");
            
            //sets the checked in time
            playerRequest.checkedIn = dformat;
                        
            $scope.playerQueue.$add(playerRequest);
            isQueueClicked = false;
            $("#add_queue_btn").css({backgroundColor: "#17A9CC"}).html("Add");
        } else {
            isQueueClicked = true;
            $("#add_queue_btn").css({backgroundColor: "#458B00"}).html("Are you sure?");
        }
    }
    
    $scope.removeFromQueue = function(playerID) {
        $scope.playerQueue.$remove(playerID);
    }
    
}])