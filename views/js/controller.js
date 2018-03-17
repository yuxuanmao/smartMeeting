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

    $scope.pastChats = ["Good Morning", "How are you"]

    $scope.sendMessage = function(){
        $scope.pastChats.push($scope.user + ": " + $scope.message);
        $scope.message = '';
    }

});
