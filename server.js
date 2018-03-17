const express = require('express');
const bodyParser = require('body-parser');

const app= express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname+ '/views'));




app.get('/rooms', (req, res) =>{
    data = require('./sample.json'); //get rooms from database
    res.send(data);
})



app.post('/chatRoom', (req, res) => {
    
    var roomId = JSON.parse(JSON.stringify(req.body)).roomId;
    console.log(roomId);
    //res.sendFile(__dirname + '/front-end/chatRoom.html');
})

app.post('/analyzeChat', (req, res) => {
    
})

app.get('*', (req,res) =>{
    res.sendFile(__dirname + '/views/index.html');
})

// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    
    socket.on('join', (data) => {
        socket.join(data.room);
        console.log(data.user + ' has joined ' + data.room);
        tech.in(data.room).emit('autoMessage', { user: data.user, msg: " has entered the room"});
    })

    socket.on('message', (data) => {
        console.log(data.user + ':' + data.msg);
        tech.in(data.room).emit('message',  { user: data.user, msg: data.msg});
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        //tech.emit('message', 'user disconnected');
    })
})


