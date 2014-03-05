wgl.controller('Login', ['$scope','$rootScope','$firebase', function mtCtrl($scope,$rootScope,$firebase){

    var usersURL = "https://thewgl.firebaseio.com/thewgl/users/";
    $scope.users = $firebase(new Firebase(usersURL));
    
    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
        var usersRef = new Firebase(usersURL);
        usersRef.child(user.id).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            if (snapshot.val() !== null) {
                $rootScope.loginObj.user = snapshot.val();
                console.log("User id: " + user.id + " exists already, logging in");
            } else {
                console.log("User id: " + user.id + " does not exist, adding and logging in");
                
                user.profilePicture = "http://graph.facebook.com/" + user.username + "/picture?type=large";
                user.userType = "Gamer";
                usersRef.child(user.id).set(user);
                $rootScope.loginObj.user = user;
                
                //Display a notification
                if (!("Notification" in window)) {
                    console.log("We had some notifications for you but your browser can’t show them.");
                } else if (Notification.permission === "granted") {
                    var notification = new Notification("New User!", {body: "Welcome to Wingaming Lounge", icon: user.profilePicture});
                }
            }
        });
    });

    $scope.logout = function() {
        $rootScope.loginObj.$logout();
        $location.path('/') 
    };

    $scope.staffFilter = function(staff){
        return (staff.userType == 'Admin' || staff.userType == 'Staff');
    }
<<<<<<< HEAD
    
    var isUserClicked = false;
    $scope.updatePermission = function(info){
        if (isUserClicked) {
            $scope.users.$update({

            });
            $("#add_user_btn").css({backgroundColor: "#17A9CC"}).html("Save");
            isUserClicked = false;
        } else {
            $("#add_user_btn").css({backgroundColor: "#458B00"}).html("Are you sure?"); 
            isUserClicked = true;
        } 
    }

    //auto complete
    $scope.userTyping = false;
    //Filter user search and select to input
    $scope.limit = 5;
    $scope.selectUser = function (gamer, id) {
        $scope.userInfos.displayName = angular.fromJson(angular.toJson(gamer.displayName));
        $scope.userInfos.email = angular.fromJson(angular.toJson(gamer.email));
        $scope.userInfos.userType = angular.fromJson(angular.toJson(gamer.userType));

        $scope.userTyping = false;
        console.log(id);

    };
=======
>>>>>>> 8307b86f5269ae5004803fa9df7089677ac7dd32

}]);