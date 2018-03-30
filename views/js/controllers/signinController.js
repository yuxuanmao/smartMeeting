app.controller('signinController', function($scope, $http, $location, registerService) {

    $scope.signinshow = true;

    $scope.signupToggle2 = function() {
        $scope.signinshow  = $scope.signinshow === true ? false : true;
        $location.path('/signuppage')
    };

    $scope.roomToggle = function() {
        registerService.signin($scope.user);
    };
});
