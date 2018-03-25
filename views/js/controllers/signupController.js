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
            url: "/signup",
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