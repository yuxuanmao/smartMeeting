
app.controller('signupController', function($scope, $http, $location, registerService) {

    $scope.signupshow = true;
    
    $scope.signinToggle2 = function() {
        $scope.signupshow  = $scope.signupshow === true ? false : true;
        $location.path('/signinpage')
    };

    $scope.roomToggle = function() {
        registerService.signup($scope.user);
    };

});