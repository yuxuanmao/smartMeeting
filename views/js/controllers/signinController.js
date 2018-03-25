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
            url: "/signin",
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