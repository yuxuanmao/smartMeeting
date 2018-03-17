$(document).ready(function() {

	$('.flex-container').hide();
    $('#signin').hide();
    $('#signup').hide();

    $('#jumbotron').hide();

    $('#signinbt').on('click', function() {
        $('#home').slideToggle();
        $('#signin').slideToggle();
    });

    $('#signupbt').on('click', function() {
        $('#home').slideToggle();
        $('#signup').slideToggle();
    });

    $('#signupbt2').on('click', function() {
        $('#signin').slideToggle();
        $('#signup').slideToggle();
    });

    $('#signinbt2').on('click', function() {
        $('#signup').slideToggle();
        $('#signin').slideToggle();
    });

    $('#signininput').on('click', function() {
        $('#signin').hide();
		/*$('#lucyCSS').remove();*/
		//$("#lucyBootstrap").remove();
		//$('.flex-container').show();
        /*$('#roomList').show();*/
    });

    $('#signupinput').on('click', function() {
        $('#signup').slideToggle();
        /*$('#roomList').show();*/
		/*$('#lucyCSS').remove();*/
		$("#lucyBootstrap").remove();
		$('.flex-container').show();
        var email = $('#email').val();
        domain = email.substring(email.indexOf("@") + 1, email.length);

        var url = 'https://company.clearbit.com/v2/companies/find?domain=' + domain;
        console.log(url);

        $.ajax({
            url:url,
            type:'GET',
            beforeSend: function(xhr){
                
                xhr.setRequestHeader('Authorization', 'Bearer sk_ac7d1de4c2ba0c2919b70879ab1e6296');
            },
            success:function(res){
                var image = '<img class="card-img-top" src="https://logo.clearbit.com/' + res.domain + '" alt="Card image cap" width=200 height=200 style="border-radius:50%" object-fit: cover">';
                var imgPath = "https://logo.clearbit.com/" + res.domain;
                $('img#thumbnail').attr('src', imgPath);
                console.log(image);
                $('#logo').append(image);
            },
            error: function(err) {
                $('div#logo').append('<img class="card-img-top" src="./resources/if_Personal_98961.png" alt="Card image cap" width=200 height=200 style="border-radius:50%" object-fit: cover">'); 
                console.error(err);
            }
        });
    });


    $('#sendMessage').click(() => {
        let msg = $('#m').val();
        var toneList = [];

        $.ajax({
            url:'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21',
               type:'POST',
               body: JSON.parse('{ "text": "' + msg +'"}'),
               json: true,
               auth: {
                'user': '82a1f1c1-5255-4642-a016-0d8d21294ac2',
                'pass': 'BSi6j2ZaJp2a'
               },
               success:function(res){
                    for(var tone in response.document_tone.tones){
                        toneList.push(response.document_tone.tones[tone]);
                    };
               },
               error: function(err) {
                   console.error(err);
               }
        });

        var text = ""
        if(toneList.length == 0){
            text = "<div class='row' id = 'msg'>" +
                            "<div class='col-xs-10 col-md-10'>" +
                                "<div class='messages' style='background-color:#D6EAF8; \
                                padding-left: 10px; padding-right: 10px; padding-top: 5px; \
                                border-radius: 3px; center; clear: both; float: left; \
                                margin: 10px; height: 40px;'>" +
                                    "<p>"  + msg + "</p>" +
                                "</div>" +
                            "</div>" +
                        "<div>";
        } else {
            var emotionTag =""
            for(var e in toneList){
                emotionTag = emotionTag + JSON.stringify(toneList[e].tone_name) + " ";
            }

            text = "<div class='row' id = 'msg'>" +
                            "<div class='col-xs-10 col-md-10'>" +
                                "<div class='messages'>" +
                                    "<p>" + msg + "<span>" + emotionTag + "</span>" + "</p>"
                                "</div>" +
                            "</div>" +
                        "<div>";
        }

        $('#messages').append(text);
        $('#m').val('');
    });

});




