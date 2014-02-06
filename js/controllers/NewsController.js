wgl.controller('news', ['$scope','$routeParams','$rootScope', '$firebase', function mtCtrl($scope, $routeParams,$rootScope,$firebase) {
    $scope.limit = 2;
    $scope.order = 'title';

    var newsURL = "https://thewgl.firebaseio.com/thewgl/news/";
    $scope.news = $firebase(new Firebase(newsURL));
    
    $scope.newsItem = $firebase(new Firebase("https://thewgl.firebaseio.com/thewgl/news/" + $routeParams.newsItemID));


    $scope.addNewsItem = function(newsItem) {
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        
        var dateAdded = curr_month + "/" + curr_date + "/" + curr_year;
        
        newsItem.poster = $rootScope.loginObj.user.displayName;
        newsItem.date   = dateAdded;
        
        $scope.news.$add(newsItem);
    };

    $scope.removeNewsItem = function(id) {
        $scope.news.$remove(id);
    }
    
    $scope.updateNewsItem = function(newsItem) {
        console.log(newsItem);
    }


//    $scope.news = angular.fromJson(angular.toJson($scope.newsItem));

}]);