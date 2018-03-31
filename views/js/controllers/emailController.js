app.controller('emailController', function ($scope, $http, $location, socket) {

    $scope.emailcentershow = true;
    $scope.optionsShow = true;


    $scope.sendNotification = function () {
        $scope.optionsShow = false;
        $scope.futureShow = true;
    };

    $scope.sendFollowup = function () {
        $scope.optionsShow = false;
        $scope.pastShow = true;
    };

    $scope.sendReports = function () {
        $scope.optionsShow = false;
    };

    $scope.backToggle = function () {
        $scope.optionsShow = true;
        $scope.futureShow = false;
        $scope.pastShow = false;
    };

    $scope.sendPost = function(){
        $scope.inviteRes = ""
        socket.emit('post info', { usr_email: $scope.other.email, post_content: $scope.user.notification});
        $scope.user.notification="";
        $scope.other.email="";
    }

});
