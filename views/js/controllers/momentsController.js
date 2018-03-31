app.controller('momentsController', function($scope, $http) {

    $scope.post;

    $http({
        method: "GET",
        url: "/moments"
    }).then(function(response) {

        $scope.posts = JSON.parse(JSON.stringify(response.data));

        $scope.selectPost = function(item) {
            $scope.post = item;
        }
    }, function(err) {
        console.log(err);
    });

    $scope.deletePost = function(){
        $http({
            method: "DELETE",
            url: "/moments"
        });
    }.then(function(response) {
        console.log("delete successful");
    }), function(err) {
        console.log(err);
    }
});
