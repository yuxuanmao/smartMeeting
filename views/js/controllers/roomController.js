app.controller('roomController', function($scope, $http, $location, userInfo) {
    $scope.user = userInfo.getUser();

    $http({
        method : "GET",
        url : "/rooms" + $scope.user
    }).then(function(response) {
        $scope.rooms = JSON.parse(JSON.stringify(response.data)).rooms;
        
        $scope.goToChatRoom = function(id){
            userInfo.setRoom(id);
            $location.url('/myRoom');
        }
    }, function (err) {
        console.log(err);
    });


    $scope.addRoom = function(room){
        $scope.rooms.push(room);
        $scope.newRoom = "";

        $http({
            method: "POST",
            url: "/addNewRoom",
            data: {
                'room': room,
                'user': $scope.user
            }
        }).then(function(response) {
            
        }, function (err) {
            console.log(err);
        });
    }
});
