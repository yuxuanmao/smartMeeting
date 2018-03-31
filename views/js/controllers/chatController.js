app.controller('chatController', function($scope, $http, $location, socket, userInfo){

    $scope.room = userInfo.getRoom();
    $scope.user = userInfo.getUser();
    $scope.pastChats;
    $scope.inviteRes;
    $http({
        method : "GET",
        url : "/pastChats" + $scope.room
    }).then(function(response) {
        //console.log(JSON.parse(JSON.stringify(response.data)));
        $scope.pastChats = JSON.parse(JSON.stringify(response.data));

    }, function (err) {
        console.log(err);
    });
    socket.emit('join', { user: $scope.user, room: $scope.room});

    $scope.invite = function(){
        var user = $scope.inviting;
        $scope.inviting = ""
        $http({
            method: "POST",
            url: "/invite",
            data: {
                'room': $scope.room,
                'user': user
            }
        }).then(function(response) {
            var res = JSON.parse(JSON.stringify(response.data)).result;
            if (res == "pass") {
                $scope.inviteRes = "Successful";
            } else {
                $scope.inviteRes = "Fail";
            }

        }, function (err) {
            console.log(err);
        });
    }
    $scope.send = function(){
        $scope.inviteRes = ""
        socket.emit('chat message', { user: $scope.user, msg: $scope.message, room: $scope.room});
        $scope.message="";
    };

    $scope.backToRoomList = function(){
        socket.emit('leave', { user: $scope.user, room: $scope.room});
        $location.path('/selectRoom');
    };

    socket.on('chat message', function(data){
        /**
         * document_tone.tones
         * {score: 0.6165, tone_id: "sadness", tone_name: "Sadness"}
         * {score: 0.6165, tone_id: "sadness", tone_name: "Sadness"}
         * {score: 0.6165, tone_id: "sadness", tone_name: "Sadness"}
         */
        var tones = data.document_tone.tones;
        data["processed_tones"] = "";
        for (i = 0; i < tones.length; i++) {
            
            var tone = tones[i];
            var tone_name = tone["tone_name"];
            var score = Number(tone["score"]).toFixed(1);
            var str = tone_name + " " + score + " ";
            data["processed_tones"] += str;
           
        }
       
        // console.log(processed_data);
        console.log(data);
        console.log(data.user);
        $scope.pastChats.push(data);
    });

    $scope.changeChat = function(chat_user) {

        if (chat_user == $scope.user) {
            return "selfUser"
        } else {
            return "otherUser"
        }
    }
})
