const app = angular.module("myApp", ["ngRoute"]);

app.run(function($rootScope) {
    $rootScope.navbar = true;
})

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html",
        controller : "homeController"
    })
    .when("/selectRoom", {
        templateUrl : "SelectRoom.html",
        controller : "roomController"
    })
    .when("/signinpage", {
        templateUrl : "signin.html",
        controller : "signinController"
    })
    .when("/signuppage", {
        templateUrl : "signup.html",
        controller : "signupController"
    })
    .when("/myRoom", {
        templateUrl : "MyRoom.html",
        controller: "chatController"
    })
    .when("/emailCenter", {
        templateUrl: "emailPage.html",
        controller: "emailController"
    })

    .when("/profile",{
        templateUrl: "profile.html",
        controller: "profileController"
    })

});
