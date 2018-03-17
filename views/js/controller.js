app.controller('roomController', function($scope, $http, $location, userInfo) {
    $http({
        method : "GET",
        url : "/rooms"
    }).then(function(response) {
        //console.log(JSON.parse(JSON.stringify(response.data)).rooms);
        $scope.rooms = JSON.parse(JSON.stringify(response.data)).rooms;
        $scope.user =JSON.parse(JSON.stringify(response.data)).username;
        $scope.goToChatRoom = function(id){
            userInfo.setRoom(id);
            userInfo.setUser($scope.user);
            $location.url('/myRoom');
        }
    }, function (err) {
        console.log(err);
    });
});

app.controller('chatController', function($scope, $http, userInfo){
    
    $scope.room = userInfo.getRoom();
    $scope.user = userInfo.getUser();
    
    $scope.pastChats = ["Good Morning", "How are you"]

    $scope.sendMessage = function(){
        $scope.pastChats.push($scope.user + ": " + $scope.message);
        $scope.message = '';
    }
   
})