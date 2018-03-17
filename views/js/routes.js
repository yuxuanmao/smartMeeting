const app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/selectRoom", {
        templateUrl : "SelectRoom.html",
        controller : "roomController"
    })
    .when("/myRoom", {
        templateUrl : "MyRoom.html",
        controller: "chatController"
    })
    
});
