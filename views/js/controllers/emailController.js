app.controller('emailController', function ($scope, $location) {
    
    $scope.emailcentershow = true;
    $scope.optionsShow = true;
   
    
    $scope.sendNotification = function () {
        $scope.optionsShow = false;
        $scope.futureShow = true;
    };
    
    $scope.sendFollowup = function () {
        $scope.optionsShow = false;
        $scope.pastShow = true;

    };
    
    $scope.sendReports = function () {
        $scope.optionsShow = false;
    };
    
    $scope.backToggle = function () {
        $scope.optionsShow = true;
        $scope.futureShow = false;
        $scope.pastShow = false;
    }



  
    
    /*Enter EmailCenter through email button*/
    // $(document).ready(function () {
    //     $("li#Emails").click(function () {
    //         $(".PostFormBox").hide();
    //         $(".profilePageBox").hide();
    //         $(".profilebar").hide();
    //         $(".FriendsPageBox").hide();
    //         $(".MomentsPageBox").hide();
    //         $(".roomblock").hide();
    //         $(".emailCenter").show();

    //         var cssFile = document.getElementsByClassName("originalCSS")[0];
    //         cssFile.setAttribute("href", "./css/index.css");
    //     })
    // });

  

});