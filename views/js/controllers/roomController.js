app.controller('roomController', function($scope, $http, $location, userInfo) {
    $http({
        method : "GET",
        url : "/rooms" + userInfo.getUser()
    }).then(function(response) {
        //console.log(JSON.parse(JSON.stringify(response.data)).rooms);
        $scope.rooms = JSON.parse(JSON.stringify(response.data)).rooms;
        $scope.user =JSON.parse(JSON.stringify(response.data)).name;
        $scope.goToChatRoom = function(id){
            userInfo.setRoom(id);
            $location.path('/myRoom');
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
            json: {
                'room': room,
                'user': user
            }
        }).then(function(response) {
            
        }, function (err) {
            console.log(err);
        });
    }
});
