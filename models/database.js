var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://18.188.83.191:27017/local";

/**
 * Insert new room
 * @param {*} roomObj: { name: 'John', rooms: ['Highway 71', 'HIghway 1322']}
 */
module.exports.insertUser = function(userObj){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database connected!");
        var dbo = db.db("mydb");

        dbo.collection("User_Rooms").insertOne(userObj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}

/**
 * Room_chatHistory"
 */

