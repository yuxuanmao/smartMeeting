var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://18.188.83.191:27017/local";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("User_Rooms").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    //db.close();
  });

  dbo.collection("User_Rooms").findOne({name: 'kerr'}, function(err, result) {

    if (result == null) {
        var rooms = []
        rooms.push('GoodROom');
        IDBObjectStore.collection("User_Rooms").insertOne({
           name: 'kerr',
           rooms: rooms
        });
    } else {
        var rooms = result.rooms;
        if(rooms.indexOf("GreatRoom") == -1){
            rooms.push("GreatRoom");
            dbo.collection("User_Rooms").updateOne({ "_id": result._id}, {$set: {rooms : rooms} }, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
            });
        }
    }
})
  /** 
  dbo.collection("userLogin").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    //db.close();
  });
  */
});
