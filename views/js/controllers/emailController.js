app.controller('emailController', function ($scope, $location) {

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


});
