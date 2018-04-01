const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./DBcontrol.js');
var ObjectId = require('mongodb').ObjectID;

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
    var query = { _usr_name: req.params.name };

    //db.collection('User_Rooms').find(query).toArray(function(err, results) {
    db.collection('User_Rooms').findOne({_usr_name: req.params.name}, function(err, results) {
        if (err) res.send(err);
        //console.log("User Chat Room Lists");
        console.log(results);
        if(results == null || results.length == 0){
            //console.log("send empty room");
            res.send({ "rooms" : [] });
        } else {
            //console.log("send search res");
            res.send(results);
        }

    })
})

app.get('/moments:name', (req, res) => {
    console.log(req.params.name);
    db.collection("Posts").find({_usr_name: req.params.name}).toArray(function(err, result) {
        //res.json({result: result});
        res.send(result);
        console.log(JSON.stringify(result));
    });
})



app.post('/signin', (req, res) => {

    var user_email = JSON.parse(JSON.stringify(req.body)).email;
    var user_password = JSON.parse(JSON.stringify(req.body)).password;

    db.collection("Users").findOne({usr_email: user_email, usr_pass: user_password}, function(err, result) {

        if (result == null) {
            res.json({result: "fail"});
        } else {
            //console.log("User Sign in Info");
            //console.log(result);
            res.json({result: result});
        }
    })
})

app.put('/addNewRoom', (req, res) => {
    var info = JSON.parse(JSON.stringify(req.body));

    db.collection("User_Rooms").findOne({_usr_name: info.user}, function(err, result) {
        if (result == null) {
            var rooms = []
            rooms.push(info.room);
            DB.roomInsert(db, {_usr_name: info.user, rooms: rooms}, function(){});
        } else {
            var rooms = result.rooms;
            if(rooms.indexOf(info.room) == -1){
                DB.roomUpdate(db, {_usr_name: info.user, rooms: info.room}, function(){});
            }
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

    var email_query = {usr_email: user_email};
    var username_query = {_usr_name: user_username};

    db.collection("Users").findOne({_usr_name: user_username}, function(err, result) {

        if (!err) {
            db.collection("Users").insertOne({
                usr_email: user_email,
                _usr_name: user_username,
                usr_pass: user_password,
                usr_employer: user_employer,
                usr_dept: user_department,
                usr_team: user_team
            });

            res.json({result: "pass"});

        } else {
            res.json({result: "fail"});
        }
    })
})

app.post('/invite', (req, res) => {
    var user = JSON.parse(JSON.stringify(req.body)).user;
    var room = JSON.parse(JSON.stringify(req.body)).room;

    db.collection("Users").findOne({_usr_name: user}, function(err, result) {
        if (result == null) {
            res.json({result: "fail"});
        } else {
            db.collection("User_Rooms").findOne({_usr_name: user}, function(err, result) {
                if (result == null) {
                    var rooms = [];
                    rooms.push(room);
                    DB.roomInsert(db, {_usr_name: user, rooms: rooms}, function(){});
                } else {
                    var rooms = result.rooms;
                    if(rooms.indexOf(room) == -1){
                        DB.roomUpdate(db, {_usr_name: user, rooms: room}, function(){});
                    }
                }
            })
            res.json({result: "pass"});
        }
    })
})

app.get('/pastChats:room', (req, res) => {
    var query = { room: req.params.room };

    db.collection('Room_chatHistory').find(query).toArray(function(err, results) {
        if (err) res.send(err);
        //console.log("Room Chat List");
        //console.log(results);
        res.send(results);
    })
})


var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzerV3({
   username: '82a1f1c1-5255-4642-a016-0d8d21294ac2',
   password: 'BSi6j2ZaJp2a',
   version_date: '2017-09-21'
 });

app.get('*', (req,res) =>{
    res.sendFile(__dirname + '/views/index.html');
})

const tech = io.of('/tech');

tech.on('connection', (socket) => {

    socket.on('join', (data) => {
        socket.join(data.room);
        console.log(data.user + ' has joined ' + data.room);
    })

    socket.on('leave', (data) => {
        console.log(data.user + ' has left ' + data.room);
        socket.leave(data.room);
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
                // process the anaylyzed results

                var tones = res.document_tone.tones;
                res["processed_tones"] = "";
                for (i = 0; i < tones.length; i++) {

                    var tone = tones[i];
                    var tone_name = tone["tone_name"];
                    var score = Number(tone["score"]).toFixed(1);
                    var str = tone_name + " " + score + " ";
                    res["processed_tones"] += str;

                }

                // console.log(processed_data);
                // console.log(res);
                // console.log(res.user);

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


//const tech = io.of('/tech');
tech.on('connection', (socket) => {
    socket.on('post info', (data) => {
        DB.postInsert(db, {usr_email: data.usr_email, post_content: data.post_content}, function(){});
    });
})


app.delete('/moments:id', (req, res) => {
    //var post = JSON.parse(JSON.stringify(req.body));
    console.log(req.params.id);
    db.collection('Posts').remove({"_id": new ObjectId(req.params.id)}, function(err, result){
        if(err) throw err;
        res.send(result);
    });
   
})
