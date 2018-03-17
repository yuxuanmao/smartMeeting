var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://18.188.83.191:27017/local";


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});