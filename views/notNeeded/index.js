var size_li = 0;

$(document).ready(function(){
    /*Hide Moments page*/
    $(".emailCenter").hide();
    $(".MomentsPageBox").hide();
    $(".PostFormBox").hide();
    $(".roomblock").hide();
    $(".profilePageBox").hide();


    /*Add Friends page elements automatically*/
    var addFriendBtn = document.createElement("div");
    addFriendBtn.setAttribute("id", "addBtn");
    addFriendBtn.appendChild(document.createTextNode("Add Friend"));

    var alphabetBox = AlphabetBox();
    var friends = FriendList();

    $("div.FriendsPageBox").append(alphabetBox);
    $("div.FriendsPageBox").append(friends);
    $("div.FriendsPageBox").append(addFriendBtn);

    /*This is example of adding user to friend list */
        addFriend("Leon Mao");
        addFriend("KerJohn Kerry Chen");
        addFriend("Xhihan Jia");
        addFriend("Lucy Wang");

    /*Then hide Friends page*/
    $(".FriendsPageBox").hide();

    /*Create Post */
    var newPost1 = FormPost("./resources/picture-show-flickr-promo.jpg", "I am new user! Leon");
    var newPost2 = FormPost("./resources/if_Personal_98961.png",
        "CSC309 project A2 Meeting Notice: 2018/02/28 4:00pm at BA3200. Do not forget it!");
    var newPost3 = FormPost("./resources/if_Personal_98961.png",
        "Hello everyone. I opened a new course in U of T for this Fall term. If you are interested, check my page.")
    $("ul#postList").prepend(newPost1);
    $("ul#postList").prepend(newPost2);
    $("ul#postList").prepend(newPost3);

    /*This is for Moments page to load more or less posts */
    $(document).ready(function () {
        size_li = $("#postList li").length;
        var x=1;
        $('#postList li').not(':lt('+x+')').hide();
        $('#postList li:lt('+x+')').show();
        $('#loadMore').click(function () {
            x= (x+1 <= size_li) ? x+1 : size_li;
            $('#postList li:lt('+x+')').show();
        });
        $('#showLess').click(function () {
            if(x-1==0
            ){
                x=1;
                $('#postList li:lt('+x+')').show();
            }else{
                x=x-1;
                $('#postList li').not(':lt('+x+')').hide();
            }
        });
    });
});



function postPost(newPost){
    $("ul#postList").prepend(newPost);
}


/*Dynamic page functions ...*/

/*This function is for Moments page */
function colorBookmark(input){
    if(input.src.match("ed")){
        input.src = "bookmark.png";
    }else{
        input.src = "bookmarked.png";
    }
}


/*This function is for Profile page */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result)
                      .width(200)
                      .height(200)
                      .css({"border-radius": "50%", "object-fit": "cover"});
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function readURLToThumbnail(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#thumbnail').attr('src', e.target.result)
                      .width(50)
                      .height(50)
                      .css({"border-radius": "50%", "object-fit": "cover"});
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function readImg(input, tag , size) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(tag).attr('src', e.target.result)
                .width(size)
                .height(size)
                .css({"border-radius": "50%", "object-fit": "cover"});
        }

        reader.readAsDataURL(input.files[0]);
    }
}




/*This is function to add friend to friends page */
function addFriend(name){
    var TopLetter;
    for(i=name.length-1; i>=0; i--){
        if(name[i] == " "){
            TopLetter = name[i+1];
            break;
        }
    }
    var category = document.getElementById(TopLetter.toUpperCase());
    var userBox = document.createElement("div");
    userBox.setAttribute("class", "contentBox-3");
    userBox.appendChild(document.createTextNode(name));
    category.appendChild(userBox);
}

/*Enter EmailCenter through email button*/
$(document).ready(function(){
    $("li#Emails").click(function(){
        $(".PostFormBox").hide();
        $(".profilePageBox").hide();
        $(".profilebar").hide();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
        $(".roomblock").hide();
        $(".emailCenter").show();

        var cssFile = document.getElementsByClassName("originalCSS")[0];
        cssFile.setAttribute("href", "./css/index.css");
    })
});

/*get FutureSection in emailCenter*/
$(document).ready(function(){
    $("button#noticebutton").click(function(event){
        event.preventDefault();
    
        $(".sendOptions").hide();
        $("#futureSection").show();
    })
});

/*get pastSection in emailCenter*/
$(document).ready(function(){
    $("button#followupbutton").click(function(event){
        event.preventDefault();
        
        $(".sendOptions").hide();
        $("#pastSection").show();
    })
});

/*get sendOptions in emailCenter*/
$(document).ready(function(){
    $("button#backbutton").click(function(event){
        event.preventDefault();
        
        $("#futureSection").hide();
        $("#pastSection").hide();
        $(".sendOptions").show();
    })
});

/*Login the profile page from login button*/
$(document).ready(function(){
    $("div#loginBtn").click(function(event){
        event.preventDefault();
        $(".PostFormBox").hide();
        $(".profilePageBox").hide();
        $(".profilebar").show();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
        $(".roomblock").hide();

        var cssFile = document.getElementsByClassName("originalCSS")[0];
        cssFile.setAttribute("href", "./css/index.css");
    });
});

//login button is clicked
$(document).ready(function(){
    $("div#logoutBtn").click(function(event){
        event.preventDefault();
        $("img#blah").attr("src", "./resources/if_Personal_98961.png");
        $("img#thumbnail").attr("src", "./resources/if_Personal_98961.png");
        

        $("#updateProfileForm")[0].reset();
        

        $("span[ng-bind=username]").empty();
        $("span[ng-bind=email]").empty();
        $("span[ng-bind=employer]").empty();
        $("span[ng-bind=department]").empty();
        $("span[ng-bind=team]").empty();

        

        $("#singupForm")[0].reset();

        $(".PostFormBox").hide();
        $(".profilePageBox").hide();
        $(".profilebar").show();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
        /*reset email center setting*/
        $("#futureSection").hide();
        $("#pastSection").hide();
        $(".sendOptions").show();
        $(".emailCenter").hide();
        
        $(".flex-container").hide();

        var cssFile = document.getElementsByClassName("originalCSS")[0];
        cssFile.setAttribute("href", "./css/index.css");

        $("div#logo").empty(); //refresh the content in log section 
        BootstrapRestore();
        $("#home").slideToggle();
    });
});

/*Save profile button action*/
$(document).ready(function(){
    $("button#SaveProfilebtn").click(function(event){
        event.preventDefault();
        readURLToThumbnail($("input#imgInp")[0]);
        readURL($("input#imgInp")[0]);
        $("span[ng-bind=username]").text($("input[id=userName]").val());
        $("span[ng-bind=email]").text($("input[id=userEmail]").val());
        $("span[ng-bind=employer]").text($("input[id=userEmployer]").val());
        $("span[ng-bind=department]").text($("input[id=department]").val());
        $("span[ng-bind=team]").text($("input[id=team]").val());
        readImg($("input#imgInp")[0], "img.card-img-top", 200);
        
        alert("Updated profile information");
        return;
    });
});

/*Post button action*/
$(document).ready(function(){
    $("div#postNew").click(function(){

        $(".PostFormBox").show();
        $(".profilePageBox").hide();
        $(".profilebar").hide();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
        $(".roomblock").hide();

        $("button#actualPostBtn").click(function(event){
            /*prevent submit button to refresh the page to clean up everything including new post*/
            event.preventDefault();
            /*Add new post to Moments page*/
            var newPost = FormPost($("img#thumbnail").attr("src"), $("textarea#subject").val());
            $("ul#postList").prepend(newPost);
            size_li = $("#postList li").length;
            $(".PostFormBox").hide();
            $(".MomentsPageBox").show();
            $(".PostFormBox")[0].reset();
            return;
        });

    });
});

/*Generate Moments page wihtout change URL*/
$(document).ready(function(){
    $("li#Moments").click(function(){
        $(".PostFormBox").hide();
        $(".profilePageBox").hide();
        $(".profilebar").hide();
        $(".FriendsPageBox").hide();
        $(".roomblock").hide();
        $(".emailCenter").hide();
        $(".MomentsPageBox").show();

        /*alert("you are accessing Moments");*/
        var cssFile = document.getElementsByClassName("originalCSS")[0];
        cssFile.setAttribute("href", "./css/index.css");
    });
});

/*Generate Friends page without change URL */
$(document).ready(function(){
    $("li#Friends").click(function(){
        $(".PostFormBox").hide();
        $(".profilePageBox").hide();
        $(".profilebar").hide();
        $(".FriendsPageBox").show();
        $(".MomentsPageBox").hide();
        $(".emailCenter").hide();
        $(".roomblock").hide();

        var cssFile = document.getElementsByClassName("originalCSS")[0];
        cssFile.setAttribute("href", "./css/friends.css");

    });
});

/*Generate Profle page without change URL*/
$(document).ready(function(){
    $("li#Profile").click(function(){
        /*alert("you are accessing Profile");*/
        $(".PostFormBox").hide();
        $(".profilebar").show();
        $(".profilePageBox").hide();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
        $(".emailCenter").hide();
        $(".roomblock").hide();

        var cssFile = document.getElementsByClassName("originalCSS")[0];
        cssFile.setAttribute("href", "./css/index.css");
    });
});

/*Generate Profle page without change URL*/
$(document).ready(function(){
    $("div#hoverThumbnail").click(function(){
        /*alert("you are accessing Profile");*/
        $(".profilebar").show();
        $(".PostFormBox").hide();
        $(".profilePageBox").hide();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
        $(".emailCenter").hide();
        $(".roomblock").hide();

        var cssFile = document.getElementsByClassName("originalCSS")[0];
        cssFile.setAttribute("href", "./css/index.css");
    });
});

//clicked chats button moved to chat rooms
$(document).ready(function(){
	$("li#Chats").click(function(){

		// BootstrapRestore(); //restore bootstrap
        $(".PostFormBox").hide();
        $(".profilePageBox").hide();
        $(".profilebar").hide();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
        $(".emailCenter").hide();
		$(".roomblock").show();
	});
});

$(document).ready(function(){
	$("#updateProfileBtn").click(function(){

		// BootstrapRestore(); //restore bootstrap
        $(".PostFormBox").hide();
        $(".profilePageBox").show();
        $(".profilebar").hide();
        $(".FriendsPageBox").hide();
        $(".MomentsPageBox").hide();
		$(".roomblock").hide();

        $("img#blah").attr("src", $("img#thumbnail").attr("src"));
        $("input[id=userName]").val($("input[ng-model=username]").val());
        $("input[id=userEmail]").val($("input[ng-model=email]").val());
        $("input[id=userEmployer]").val($("input[ng-model=employer]").val());
        $("input[id=department]").val($("input[ng-model=department]").val());
        $("input[id=team]").val($("input[ng-model=team]").val());
	});
});

function AlphabetBox(){
    var alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
                    "V", "W", "X", "Y", "Z"];

    var box = document.createElement("div");
    box.setAttribute("class", "postBlock-1");

    i=0;
    for(i=0; i<26; i++){
        var letter = document.createElement("div");
        letter.setAttribute("id", "alphabets");
        var link = document.createElement("a");
        var idName = "#".concat(alphabets[i]);
        link.setAttribute("href", idName);
        link.appendChild(document.createTextNode(alphabets[i]));
        letter.appendChild(link);
        box.appendChild(letter);
    }
    return box;
}

function FriendList(){
    var alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
    "V", "W", "X", "Y", "Z"];

    var box = document.createElement("div");
    box.setAttribute("class", "postBlock-2");

    i=0;
    for(i=0; i<26; i++){
        var contentBox = document.createElement("div");
        contentBox.setAttribute("class", "contentBox-1");
        contentBox.setAttribute("id", alphabets[i]);
        var categoryName = document.createElement("div");
        categoryName.setAttribute("class", "contentBox-2");
        categoryName.appendChild(document.createTextNode(alphabets[i]));
        contentBox.appendChild(categoryName);
        box.appendChild(contentBox);
    }
    return box;
}

function InputBox(Label){
    var id;
    var name;
    var type;
    if(Label == "User Name"){
        id = "userName";
        type = "text";
        name = "uname";
    }else if(Label = "Password"){
        id = "password";
        type = "password";
        name = "pwd";
    }
    var group = document.createElement("div");
    group.setAttribute("class", "group");
    var In = document.createElement("input")
    In.setAttribute("id", id);
    In.setAttribute("type", type);
    In.setAttribute("name", name);
    In.setAttribute("required", "true");
    var highlight = document.createElement("span");
    highlight.setAttribute("class", "highlight");
    var bar = document.createElement("span");
    bar.setAttribute("class", "bar");
    var fakeLabel = document.createElement("label");
    fakeLabel.setAttribute("class", "fake");
    fakeLabel.appendChild(document.createTextNode(Label))
    group.appendChild(In);
    group.appendChild(highlight);
    group.appendChild(bar);
    group.appendChild(fakeLabel);

    return group;
}

function FormProfile(){

    /*create Form */
    var A = document.createElement("form");
    A.setAttribute("action", "/registration");
    A.setAttribute("method", "post");

    /*create container of information*/
    var B = document.createElement("div");
    B.setAttribute("class", "container");

    /*create profile picture */
    var profilePic = document.createElement("img");
    profilePic.setAttribute("id", "blah");
    profilePic.setAttribute("src", "./resources/if_Personal_98961.png");
    profilePic.setAttribute("alt", "your image");
    profilePic.setAttribute("width", 200);
    profilePic.setAttribute("height", 200);
    profilePic.setAttribute("style", "border-radius:50%");
    profilePic.setAttribute("object-fit", "cover");

    /*create change profile pcture button */
    var picBtn = document.createElement("div");
    picBtn.setAttribute("class", "group");
    var btn = document.createElement("label");
    btn.setAttribute("for", "imgInp");
    btn.setAttribute("class", "custom-file-upload");
    btn.appendChild(document.createTextNode("upload profile image"));
    var picIn = document.createElement("input");
    picIn.setAttribute("type", "file");
    picIn.setAttribute("id", "imgInp");
    picIn.setAttribute("onchange", "readURL(this);");
    var Space = document.createElement("br");
    picBtn.appendChild(btn);
    picBtn.appendChild(picIn);
    picBtn.appendChild(Space);

    /*create change username */
    var userNameBox = InputBox("User Name");

    /*create change password */
    var passwordBox = InputBox("Password");

    /*create submit button */
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn");
    submitBtn.setAttribute("type", "submit");
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("Change Profile"));
    submitBtn.appendChild(span);

    /*put all boxes to container */
    B.appendChild(profilePic);
    B.appendChild(picBtn);
    B.appendChild(userNameBox);
    B.appendChild(passwordBox);
    B.appendChild(submitBtn);

    /*put container to form */
    A.appendChild(B);



    return A;
}



function FormPost(pic, text){
    /*form post frame*/
    var Apost = document.createElement("li");
    /*var ApostAtt = Apost.createAttribute("class");
    ApostAtt.value = "postBlock-1";*/
    Apost.setAttribute("class", "postBlock-1");

    /*form profile pic*/
    var Bpost = document.createElement("div");
    Bpost.setAttribute("class", "contentBox-1");
    var img = document.createElement("img");
    img.setAttribute("id", "sample");
    img.setAttribute("src", pic);
    img.setAttribute("width", 50);
    img.setAttribute("height", 50);
    img.setAttribute("style", "border-radius:50%");
    img.setAttribute("object-fit", "cover");
    Bpost.appendChild(img);

    /*form content wrapper*/
    var Cpost = document.createElement("div");
    Cpost.setAttribute("class", "contentBox-4");

    /*form content*/
    var content = document.createTextNode(text);
    var Dpost = document.createElement("div");
    Dpost.setAttribute("class", "contentBox-2");
    Dpost.appendChild(content);

    /*form timebox*/
    var DateTime = document.createTextNode(Date());
    var Epost = document.createElement("div");
    Epost.setAttribute("class", "contentBox-3");
    Epost.appendChild(DateTime);

    /*Pust content to content wrapper*/
    Cpost.appendChild(Dpost);
    Cpost.appendChild(Epost);

    /*bookmark icon*/
    var Fpost = document.createElement("div");
    Fpost.setAttribute("class", "contentBox-6");
    var bookmarkIcon = document.createElement("img");
    bookmarkIcon.setAttribute("id", "favorite");
    bookmarkIcon.setAttribute("onclick", "colorBookmark(this);");
    bookmarkIcon.setAttribute("src", "bookmark.png");
    Fpost.appendChild(bookmarkIcon);

    Apost.appendChild(Bpost);
    Apost.appendChild(Cpost);
    Apost.appendChild(Fpost);

    /*var AImg = document.createElement("div");*/
    return Apost;
}

/*This is function for side menu bars*/
function openNav() {
    document.getElementById("mySidenav").style.width = "150px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

document.onclick = function(event) {

    var sideMenu = document.getElementById("mySidenav");
    var openSideMenu =  document.getElementById("sideMenuOpen");

    if (event.target != sideMenu && event.target != openSideMenu) {
        sideMenu.style.width = "0";
    }
}

//Restore Lucy's BootStrap
function BootstrapRestore(){
	var BootstrapCSS = document.createElement('link');
	BootstrapCSS.setAttribute('id', 'lucyBootstrap');
	BootstrapCSS.setAttribute('rel', 'stylesheet');
	BootstrapCSS.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
	BootstrapCSS.setAttribute('integrity', "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm");
	BootstrapCSS.setAttribute('crossorigin', "anonymous");
	alert("middle3");
	document.getElementsByTagName("head")[0].appendChild(BootstrapCSS);
	alert("middle4");
}
