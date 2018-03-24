var userRooms = require('../models/userRoom.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getUserRooms = async function(query, page, limit){
    var options = {
        page,
        limit
    }

    try {
        var res = await userRooms.paginate(query, options) 
        return res;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createUserRooms = async function(user){
    var newTodo = new ToDo({
        name: user.name,
        rooms: user.rooms,
    })

    try{
        var saveInfo = await newTodo.save();

        return saveInfo;
    }catch(e){   
        throw Error("Error while Creating Todo")
    }
}

exports.updateUserRooms = async function(user){
    var id = user.id

    try{
        var oldUser = await userRooms.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }
    if(!oldUser){
        return false;
    }
    console.log(oldUser)

    oldUser.name = user.name;
    oldUser.rooms = user.rooms;
    console.log(oldUser)

    try{
        var saved = await oldUser.save()
        return saved;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}