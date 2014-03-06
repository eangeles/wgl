wgl.controller('news', ['$scope','$routeParams','$location','$rootScope','$firebase', function mtCtrl($scope, $routeParams, $location, $rootScope, $firebase) {

    var newsURL = "https://thewgl.firebaseio.com/thewgl/news/";
    $scope.news = $firebase(new Firebase(newsURL));
    
    $scope.newsItem = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/news/" + $routeParams.newsItemID));
    $scope.itemID = $routeParams.newsItemID;
    
//      angular.forEach(keys, function(key) {
//         console.log(key, $scope.everyone[key]);
//      });

//    console.log($scope.news.length);
//    for (var i=0;i<$scope.news.length;i++) {
//        console.log($scope.news[i]);
//    }
    
//    for (var name in $scope.news) {
//        console.log($scope.news[name]);
//    }
    
//    new Firebase("https://thewgl.firebaseio.com/thewgl/news/").once('value', 
//        function(dataSnapshot){ 
//
//            // dataSnapshot now contains all the videos ids, lines & links
//            // this causes many performance issues
//
//            // Then I need to loop over all elements to extract ids !
//            var i = 0;
//            var articles = new Array();
//
//            dataSnapshot.forEach(
//                function(childSnapshot) {
//                    articles[i++] = childSnapshot.name();
//                    console.log(childSnapshot.name());
//                }
//            );
//
//        }
//    );
    
    $scope.addNewsItem = function(newsItem) {
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        
        var dateAdded = curr_month + "/" + curr_date + "/" + curr_year;
        
        newsItem.poster = $rootScope.loginObj.user.displayName;
        newsItem.date   = dateAdded;
        
        $scope.news.$add(newsItem);
        $location.path("/news");
    };

    $scope.removeNewsItem = function(postId) {
        $scope.news.$remove(postId);
    }
    
    var updateRef = "";
    $scope.updateNewsItem = function(post) {
        updateRef = new Firebase("https://thewgl.firebaseio.com/thewgl/news/" + $routeParams.newsItemID);
        updateRef.update({
            image: post.image,
            title: post.title,
            content: post.content
        });
        $location.path("/news");
    }

}]);
    