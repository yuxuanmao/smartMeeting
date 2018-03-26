const express = require('express');
const bodyParser = require('body-parser');

const app= express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://18.188.83.191:27017/local";

var db;

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('mydb'); // whatever your database name is
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname+ '/views'));
app.use(express.static(__dirname+ '/views'));


app.get('/rooms:name', (req, res) =>{
    console.log(req.params.name);
    var query = { name: req.params.name };

    db.collection('User_Rooms').find(query).toArray(function(err, results) {
        if (err) res.send(err);
        console.log(results);
        res.send(results[0]);
    })
})

app.post('/signin', (req, res) => {

    var user_email = JSON.parse(JSON.stringify(req.body)).email;
    var user_password = JSON.parse(JSON.stringify(req.body)).password;

    console.log(user_email);
    console.log(user_password);

    de.collection("userLogin").findOne({email: user_email, password: user_password}, function(err, result) {

        if (result == null) {
            res.send({result: "fail"});
        } else {
            res.send({result: "pass"});
        }
    })
})

app.post('/signup', (req, res) => {
    var user_email = JSON.parse(JSON.stringify(req.body)).email;
    var user_username = JSON.parse(JSON.stringify(req.body)).username;
    var user_password = JSON.parse(JSON.stringify(req.body)).password;
    var user_employer = JSON.parse(JSON.stringify(req.body)).employer;
    var user_department = JSON.parse(JSON.stringify(req.body)).department;
    var user_team = JSON.parse(JSON.stringify(req.body)).team;
    
    var email_query = {email: user_email};
    var username_query = {username: user_username};

    db.collection("userLogin").findOne({username: user_username}, function(err, result) {

        if (!err) {
            db.collection("userLogin").insertOne({
                email: user_email,
                username: user_username,
                password: user_password,
                employer: user_employer,
                department: user_department,
                team: user_team
            });
            db.collection("userLogin").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
            });
            res.json({result: "pass"});

        } else {
            res.json({result: "fail"});
        }
    })
})

app.get('/pastChats:room', (req, res) => {
    var query = { room: req.params.room };
    console.log(query);

    db.collection('Room_chatHistory').find(query).toArray(function(err, results) {
        if (err) res.send(err);
        console.log(results);
        res.send(results);
    })
})


var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzerV3({
   username: '82a1f1c1-5255-4642-a016-0d8d21294ac2',
   password: 'BSi6j2ZaJp2a',
   version_date: '2017-09-21'
 });

app.post('/analyzeChat', (req, res) => {
    var message = JSON.parse(JSON.stringify(req.body)).message;
    //console.log(message);
// This is tone analyzer provided methods

    var jsontext = '{"text": "' + message +' "}';
    var content = JSON.parse(jsontext);
    var params = {
        'tone_input': content,
        'content_type': 'application/json'
    };
    var data='';
    tone_analyzer.tone(params, function(error, response) {
        if (error)
            console.log('error:', error);
        else

        //data = JSON.stringify(response, null, 2);
        data = response;
        console.log(data);
        }
    );

    res.send(data);

})

app.get('*', (req,res) =>{
    res.sendFile(__dirname + '/views/index.html');
})

const tech = io.of('/tech');

tech.on('connection', (socket) => {

    socket.on('join', (data) => {
        socket.join(data.room);
        console.log(data.user + ' has joined ' + data.room);
    })

    socket.on('chat message', (data) => {
        console.log(data.user + ':' + data.msg);
        var message = data.msg;


        var jsontext = '{"text": "' + message +' "}';
        var content = JSON.parse(jsontext);
        var params = {
            'tone_input': content,
            'content_type': 'application/json'
        };
        var res ='';



        tone_analyzer.tone(params, function(error, response) {
            if (error)
                console.log('error:', error);
            else
                res = JSON.parse(JSON.stringify(response, null, 2));

            var userInfo = { room: data.room, user: data.user, msg: data.msg };
            var all = Object.assign({}, res, userInfo);
            console.log(all);

            db.collection("Room_chatHistory").insertOne(all, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");

            });
            tech.in(data.room).emit('chat message', all );
        }
        );

    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})
