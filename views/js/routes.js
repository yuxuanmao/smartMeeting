const app = angular.module("myApp", ["ngRoute"]);


var currentRoom = 'myRoom';
var currentUser = 'myUser';

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
