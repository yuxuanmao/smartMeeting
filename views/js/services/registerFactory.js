app.factory('registerService', function($http, $location, userInfo){
    return{
        signup: function(user){
            $http({
                method: "POST",
                url: "/signup",
                data: {
                    'email': user.email,
                    'username': user.username,
                    'password': user.password,
                    'employer': user.employer,
                    'department': user.department,
                    'team': user.team,
                }
            }).then(function(response) {userInfo.setEmployer(user.employer);
                var res = JSON.parse(JSON.stringify(response.data)).result;
                console.log(res);
                if (res == "pass") {
                    userInfo.setUser(user.username);
                    userInfo.setEmployer(user.employer);
                    userInfo.setDepartment(user.department);
                    userInfo.setEmail(user.email);

                    $location.path('/selectRoom');
                    console.log("signup success");
                } else {
                    console.log("signup failed");
                }
            }, function (err) {
                console.log(err);
            });
        },

        signin: function(user){
            $http({
                method: "POST",
                url: "/signin",
                data: {
                    'email': user.email,
                    'password': user.password,
                }
            }).then(function(response) {
                var res = JSON.parse(JSON.stringify(response.data)).result;
                if (res != "fail") {
                    userInfo.setUser(res.username);
                    userInfo.setEmployer(res.employer);
                    userInfo.setDepartment(res.department);
                    userInfo.setEmail(res.email);

                    $location.path('/selectRoom');
                    console.log("signin sucess");
                } else {
                    console.log("signin failed");
                }
            }, function(err) {
                console.log(err);
            });
        }
    }
});
