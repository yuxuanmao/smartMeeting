$(function(){
    const room = 'javascript';
    const socket = io('/tech');
    var user = '';

    $('form').submit(() => {
            
        let msg = $('#m').val();
        socket.emit('message', { user: user, msg, room });
        $('#m').val('');
        return false;
    });

    socket.on('connect', () => {
        // emiting to everybody
        socket.emit('join', { room: room, user: user});
    })

    socket.on('autoMessage', (data) =>{
        $('#messages').append($('<li>').text(data.user + " " + data.msg));
    })

    socket.on('message', (data) => {
        $('#messages').append($('<li>').text(data.user + ": " + data.msg));
    });
});