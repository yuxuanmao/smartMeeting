app.controller('homeController', function($scope, $location) {

    $scope.homeshow = true;

    $scope.signinToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $location.url('/signinpage')
    };
    $scope.signupToggle = function() {
        $scope.homeshow  = $scope.homeshow === true ? false : true;
        $location.url('/signuppage')
    };

});