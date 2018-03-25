app.controller('chatController', function($scope, $http, $location, socket, userInfo){

    $scope.room = userInfo.getRoom();
    $scope.user = userInfo.getUser();
    $scope.pastChats;

    $http({
        method : "GET",
        url : "/pastChats" + $scope.room
    }).then(function(response) {
        console.log(JSON.parse(JSON.stringify(response.data)));
        $scope.pastChats = JSON.parse(JSON.stringify(response.data));
        
    }, function (err) {
        console.log(err);
    });

    socket.on('connect', () => {
        // emiting to everybody
        socket.emit('join', { user: $scope.user, room: $scope.room});
    })

    $scope.send = function(){

        socket.emit('chat message', { user: $scope.user, msg: $scope.message, room: $scope.room});
        $scope.message="";
    }

    $scope.backToRoomList = function(){
        $location.path('/selectRoom');
    }

    socket.on('chat message', function(data){
        /**
         * document_tone.tones
         * {score: 0.6165, tone_id: "sadness", tone_name: "Sadness"}
         * {score: 0.6165, tone_id: "sadness", tone_name: "Sadness"}
         * {score: 0.6165, tone_id: "sadness", tone_name: "Sadness"}
         */
        $scope.pastChats.push(data);
    });
})
