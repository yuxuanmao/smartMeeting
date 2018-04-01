app.controller('momentsController', function($scope, $http, userInfo) {
    $scope.user = userInfo.getUser();
    $scope.post;

    $http({
        method: "GET",
        url: "/moments" + $scope.user
    }).then(function(response) {

        $scope.posts = JSON.parse(JSON.stringify(response.data));

        $scope.selectPost = function(item) {
           $scope.post = item;
            console.log(item._id);
        }
    }, function(err) {
        console.log("error getting the posts");
        console.log(err);
    });

    $scope.deletePost = function(){
        $http({
            method: "DELETE",
            url: "/moments" + $scope.post._id
        }).then(function(response) {
            $http({
                method: "GET",
                url: "/moments" + $scope.user
            }).then(function(response) {
                $scope.posts = JSON.parse(JSON.stringify(response.data));
            }, function(err) {
                console.log("error getting the posts");
                console.log(err);
            });
            console.log("delete successful");
        }, function(err) {
            console.log("error deleting the post");
            console.log(err);
        });
    };
});
