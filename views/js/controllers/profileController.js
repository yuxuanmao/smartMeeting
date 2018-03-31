app.controller('profileController', function($scope, userInfo) {
    $scope.username = userInfo.getUser();
    $scope.email = userInfo.getEmail();
    $scope.employer = userInfo.getEmployer();
    $scope.department = userInfo.getDepartment();
    $scope.team = userInfo.getTeam();
});