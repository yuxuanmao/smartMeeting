app.controller('homeController', function($scope, $location) {

    $scope.homeshow = true;

    $scope.signinToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $location.path('/signinpage')
    };
    $scope.signupToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $location.path('/signuppage')
    };

});

app.controller('signinController', function($scope, $http, $location) {

    var check = false;

    $scope.signinshow = true;

    $scope.signupToggle2 = function() {
        $scope.signinshow  = $scope.signinshow === true ? false : true;
        $location.path('/signuppage')
    };

    $scope.roomToggle = function() {

        check = true;

        // $http({
        //     method: "POST",
        //     path: "/signin",
        //     json: {
        //         'email': $scope.user.email,
        //         'password': $scope.user.password,
        //     }
        // }),
        // // }).then(function(response) {
        // //     var res = JSON.parse(JSON.stringify(response.data)).result
        // //     if (res == "true") {
        // //         $scope.signinshow  = $scope.signinshow === true ? false : true;
        // //         $location.path('/selectRoom');
        // //     } else {
        // //         console.log("signin failed");
        // //     }
        // // },
        // function(err) {
        //     console.log(err);
        // };
    };

    if (check == true) {

        $http({
            method: "POST",
            path: "/signin",
            json: {
                'email': $scope.user.email,
                'password': $scope.user.password,
            }
        }).then(function(response) {
            var res = JSON.parse(JSON.stringify(response.data)).result
            if (res == "true") {
                $scope.signinshow  = $scope.signinshow === true ? false : true;

                check = false;

                $location.path('/selectRoom');
            } else {
                console.log("signin failed");
            }
        }),
        function(err) {
            console.log(err);
        };
    }



});

app.controller('signupController', function($scope, $http, $location) {

    $scope.signupshow = true;
    var check = false;

    $scope.signinToggle2 = function() {
        $scope.signupshow  = $scope.signupshow === true ? false : true;
        $location.path('/signinpage')
    };

    $scope.roomToggle = function() {

        check = true;

        // $scope.signupshow  = $scope.signupshow === true ? false : true;
        // $location.path('/selectRoom');
    };

    if (check == true) {

        $http({
            method: "POST",
            path: "/signup",
            json: {
                'email': $scope.user.email,
                'username': $scope.user.username,
                'password': $scope.user.password,
                'employer': $scope.user.employer,
                'department': $scope.user.department,
                'team': $scope.user.team,
            }
        }).success(function(response) {
            var res = JSON.parse(JSON.stringify(response.data)).result;
            console.log(JSON.parse(JSON.stringify(response.data)));
            if (res == "pass") {
                $scope.signupshow  = $scope.signupshow === true ? false : true;

                check = false;

                $location.path('/selectRoom');
            } else {
                console.log("signin failed");
            }
        }).error(function(err){

        });
    }
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
