app.controller('homeController', function($scope, $location) {

    $scope.homeshow = true;

    $scope.signinToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $location.url('/signin')
    };
    $scope.signupToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $location.url('/signup')
    };

});

app.controller('signinController', function($scope, $http, $location) {

    $scope.signinshow = true;

    $scope.signupToggle2 = function() {
        $scope.signinshow  = $scope.signinshow === true ? false : true;
        $location.url('/signup')
    };

    $scope.roomToggle = function() {
        $scope.signinshow  = $scope.signinshow === true ? false : true;
        $location.url('/selectRoom');

        $http({
            method: "POST",
            url: "/signin"
            json: {
                'email': $scope.user.email,
                'password': $scope.user.password,
            }
        },
        function(err) {
            console.log(err);
        });
    }
});

app.controller('signupController', function($scope, $http, $location) {

    $scope.signupshow = true;

    $scope.signinToggle2 = function() {
        $scope.signupshow  = $scope.signupshow === true ? false : true;
        $location.url('/signin')
    };

    $scope.roomToggle = function() {
        $scope.signupshow  = $scope.signupshow === true ? false : true;
        $location.url('/selectRoom');

        $http({
            method: "POST",
            url: "/signup"
            json: {
                'email': $scope.user.email,
                'username': $scope.user.username,
                'password': $scope.user.password,
                'employer': $scope.user.employer,
                'department': $scope.user.department,
                'team': $scope.user.team,
            }
        },
        function(err) {
            console.log(err);
        });
    };
});

app.controller('roomController', function($scope, $http, $location, userInfo) {
    $http({
        method : "GET",
        url : "/rooms" + "John"
    }).then(function(response) {
        //console.log(JSON.parse(JSON.stringify(response.data)).rooms);
        $scope.rooms = JSON.parse(JSON.stringify(response.data)).rooms;
        $scope.user =JSON.parse(JSON.stringify(response.data)).name;
        $scope.goToChatRoom = function(id){
            userInfo.setRoom(id);
            userInfo.setUser($scope.user);
            $location.path('/myRoom');
        }
    }, function (err) {
        console.log(err);
    });
});

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
