wgl.controller('news', ['$scope','$routeParams','angularFireCollection','$rootScope','angularFire', function mtCtrl($scope, $routeParams, angularFireCollection,$rootScope,angularFire){
    
    var newsCollection = new Firebase("https://thewgl.firebaseio.com/thewgl/news/");
    $scope.news = angularFireCollection(newsCollection);

    $scope.addNewsItem = function(newsItem) {
        //check to see if all properties
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        
        var dateAdded = curr_month + "/" + curr_date + "/" + curr_year;

        newsItem.date = dateAdded;
        console.log(newsItem);
        $scope.news.add(newsItem);
    };
    
    $scope.removeNewsItem = Function(id) {
        $scope.news.remove(id);
    }

}]);