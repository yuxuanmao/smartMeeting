var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var schema = new mongoose.Schema({
    name: String,
    room: [String]
})

schema.plugin(mongoosePaginate)
const userRooms = mongoose.model('User_Rooms', schema)

module.exports = userRooms;