wgl.controller('gts', ['$scope','$routeParams','$firebase','$location','$timeout','$rootScope', function mtCtrl($scope, $routeParams,$firebase,$location,$timeout,$rootScope){
    
    //Testing Integrating the Auto complete functionality
    $scope.gameTyping = false;
    $scope.userTyping = false;
    $scope.limit = 5;
    
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
    var updateTimer = function(){
        //=========================================
        //NEW CODE NEEDED TO CONVERT AND GET LENGTH
        //=========================================
//        $scope.surveys = $firebase(new Firebase(yourFBUrl));
//
//        $scope.surveys.$on("loaded", function() {
//           var keys = $scope.surveys.$getIndex();
//           console.log("count: " + keys.length); 
//        });
        for (var i = $scope.activeStations.length - 1; i >= 0; i--) {
            time = new Date().getTime() - $scope.activeStations[i].startTime;
            $scope.activeStations[i].displayTime = parseInt($scope.activeStations[i].countdown - (time/1000/60));
            //Checks if the time is up and removes from active adds to empty and 
            //throws an alert to display the user info of the last station
            if($scope.activeStations[i].displayTime <= 0){ 
                //throw alert for station time up                   
                alert = {
                    "user": $scope.activeStations[i].stationGamer,
                    "stationNumber": $scope.activeStations[i].stationNumber
                }
                $scope.alerts.$add(alert);
                
                $scope.emptyStations.$add({
                    "stationNumber": $scope.activeStations[i].stationNumber, 
                    "stationSystem": $scope.activeStations[i].stationSystem
                });
                $scope.activeStations.$remove($scope.activeStations[i].$id);
            }
        };
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
            
            console.log(tempActiveStation);
            console.log(tempActiveStation.stationNumber)
            //Set to override the countdown dropdown
            /*tempActiveStation.countdown = "number value here";*/
            
            //When adding to active it loops through the empty stations and finds that
            //corresponding station and removes it so it only shows in activeStations
            /*for (var i = 0; i < $scope.emptyStations.length; i++) {
                if ($scope.emptyStations[i].stationNumber == tempActiveStation.stationNumber) {
                    $scope.emptyStations.$remove($scope.emptyStations[i].$id);
                    tempActiveStation.stationSystem = $scope.emptyStations[i].stationSystem;
                }
            }            
            $scope.activeStations.add(tempActiveStation);
            */
            
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
        $scope.alerts.$add(alert);
    }
    
    $scope.removeAlert = function(alertID) {
        $scope.alerts.$remove(alertID);
    }
    
    //******************************************Queue database*******************************************************
    var urlPlayerQueue = "https://thewgl.firebaseio.com/thewgl/playerQueue";
    
    $scope.playerQueue = $firebase(new Firebase(urlPlayerQueue));
    
    var isQueueClicked = false;
    //make a var for queue button so its reusable?
    $scope.addToPlayerQueue = function(playerRequest) { 
        console.log("clicked", isQueueClicked);
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
    
    /*******************************************Change Game************************************************************/
    //sets the boolean for game change html to hide/show
//    $scope.showGameChange = function(){
//        $scope.gameChange = true;
//    }

    //sets the gameArtURL for the switch game to work
//    $scope.switchGame = function(tempGame, tempStation){ 
//        tempStation.gameArt = tempGame;
//        $scope.gameChange = false;
//    }
    
}])