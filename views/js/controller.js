app.controller('homeController', function($scope, $location) {

    $scope.homeshow = true;
    $scope.signinshow = false;
    $scope.signupshow = false;

    $scope.signinToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $scope.signinshow = $scope.signinshow === false ? true : false;
    };
    $scope.signupToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $scope.signupshow = $scope.signinshow === false ? true : false;
    };

    $scope.signinToggle2 = function() {
        $scope.signupshow  = $scope.signupshow === true ? false : true;
        $scope.signinshow = $scope.signinshow === false ? true : false;
    };
    $scope.signupToggle2 = function() {
        $scope.signinshow  = $scope.signinshow === true ? false : true;
        $scope.signupshow = $scope.signupshow === false ? true : false;
    };

    $scope.roomToggle = function() {
        $scope.signinshow  = $scope.signinshow === true ? false : true;
        $scope.signupshow  = $scope.signupshow === true ? false : true;
        $location.url('/selectRoom')
    }

});

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

    const socket = io('/tech');
   
    socket.on('connect', () => {
        // emiting to everybody
        socket.emit('join', { user: $scope.user, room: $scope.room});
    })

    $scope.send = function(){
        
        socket.emit('chat message', { user: $scope.user, msg: $scope.message, room: $scope.room});
        $scope.message="";
    }

    socket.on('chat message', function(msg){
            console.log(msg);
            //var li= document.createElement("li");
            //li.appendChild(document.createTextNode(msg.msg));
            //document.getElementById("messages").appendChild(li);
    });

    $scope.sendMessage = function(){
        
        $http({
            method: 'POST',
            url: '/analyzeChat',
            data: {'message': $scope.message}
            }).then(function(response) {
                var msg = JSON.parse(JSON.stringify(response.data));
                $scope.pastChats.push($scope.user + ": " + msg);
                $scope.message = '';
            }, function (err) {
                console.log(err);
            });
    }



})
