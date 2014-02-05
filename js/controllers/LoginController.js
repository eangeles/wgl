wgl.controller('Login', ['$scope','$rootScope','$firebase', function mtCtrl($scope,$rootScope,$firebase){

    var usersURL = "https://thewgl.firebaseio.com/thewgl/users/";
    $scope.users = $firebase(new Firebase(usersURL));
    
    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
        var usersRef = new Firebase(usersURL);
        usersRef.child(user.id).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            if (snapshot.val() !== null) {
                console.log(snapshot.val());
                console.log(user);
                console.log("User id: " + user.id + " exists already, logging in");
            } else {
                console.log("User id: " + user.id + " does not exist, adding and logging in");
                user.profilePicture = "http://graph.facebook.com/" + user.username + "/picture?type=large";
                user.userType = "Gamer";
                usersRef.child(user.id).set(user);
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
    
    var isUserClicked = false;
    $scope.updatePermission = function(info){
        if (isUserClicked) {
            $scope.users.update($scope.userInfos);
            $("#add_user_btn").css({backgroundColor: "#17A9CC"}).html("Save");
            isUserClicked = false;
        } else {
            $("#add_user_btn").css({backgroundColor: "#458B00"}).html("Are you sure?"); 
            isUserClicked = true;
        } 
    }

}]);