var express = require('express');
var triggers = require('mongo-triggers');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://18.188.83.191:27017/local";
var db;

MongoClient.connect(url, function(err, mydb) {
  if (err) throw err;
  console.log("Database created!");
  db = mydb.db("mydb");
  db.createCollection("User_Rooms", {
    validator:{
        $jsonSchema: {
            basonType: "object",
            unique: ["_usr_name"],
            required: ["_usr_name"],
            properties: {
                _usr_name: {
                    bsonType: "string",
                    description: "user name"
                },
                rooms: {
                    bsonType: "array",
                    description: "list of rooms that this user belongs to"
                }
            }
        }
    }
}, function(err, res){
      if(err) throw err;
      console.log("created User_Rooms");
  });
  db.createCollection("Users", { 
      validator:{
          $jsonSchema: {
              bsonType: "object",
              unique: ["_usr_name", "usr_email"],
              required: ["_usr_name", "usr_pass", "usr_email"],
              properties: {
                  _usr_name: {
                      bsonType: "string",
                      description: "user name"
                  },
                  usr_pass: {
                      bsonType: "string",
                      description: "user account password"
                  },
                  usr_email: {
                      bsonType: "string",
                      description: "user's email address"
                  },
                  usr_employer: {
                      bsonType: "string",
                      default: null,
                      description: "user may have employer"
                  },
                  usr_dept: {
                      bsonType: "string",
                      default: null,
                      description: "user may belong to a department"
                  },
                  usr_team: {
                      bsonType: "string",
                      default: null,
                      description: "user may belong to a team"
                  }
              }
          }
      }
  }, function(err, res) {
    if (err) throw err;
    console.log("Collection Users!");
    triggers(db.collection('Users')).insert(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next(new Error());
            }else{
                next();
            }
        })
    });
    triggers(db.collection('Users')).update(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Users')).remove(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });  
  });
  db.createCollection("Posts", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            unique: ["_post_id", "_usr_name"],
            required: ["_post_id", "_usr_name", "post_content"],
            properties: {
                _usr_name: {
                    bsonType: "string",
                    description: "user name"
                },
                _post_id: {
                    bsonType: "long",
                    description: "post id"
                },
                post_content: {
                    bsonType: "string",
                    description: "actual content of post"
                },
                _pic_id: {
                    bsonType: "long",
                    default: null,
                    description: "user may want to add pics"
                }
            }
        }
    }
  }, function(err, res) {
    if (err) throw err;
    console.log("Collection Posts!");
  });
  db.createCollection("Pics", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            unique: ["_pic_id"],
            required: ["_pic_id", "pic_url"],
            properties: {
                _pic_id: {
                    bsonType: "long",
                    description: "picture id"
                },
                pic_url: {
                    bsonType: "string",
                    description: "picture url"
                }
            }
        }
    }
  }, function(err, res) {
    if (err) throw err;
    console.log("Collection Pics!");
    triggers(db.collection('Posts')).insert(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Posts')).update(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Posts')).remove(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
  });
  db.createCollection("Friends", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            unique: ["_usr_name", "_friend_name"],
            required: ["_usr_name", "_friend_name"],
            properties: {
                _usr_name: {
                    bsonType: "string",
                    description: "user name"
                },
                _friend_name: {
                    bsonType: "string",
                    description: "friend name"
                }
            }
        }
    }
  }, function(err, res) {
    if (err) throw err;
    console.log("Collection Friends!");
    triggers(db.collection('Friends')).insert(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Friends')).update(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Friends')).remove(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
  });
  db.createCollection("EmailWarehouse", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            unique: ["_mail_id"],
            required: ["_mail_id", "mail_type", "mail_content"],
            properties: {
                _mail_id: {
                    bsonType: "long",
                    description: "mail unique serial number"
                },
                mail_type: {
                    bsonType: "string",
                    enum: ["sent", "received", "draft"],
                    description: "mail type"
                },
                mail_content: {
                    bsonType: "string",
                    description: "actual content of mail"
                }
            }
        }
    }
  }, function(err, res) {
    if (err) throw err;
    console.log("Collection EmailWarehouse!");
  });
  db.createCollection("Emails", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            unique: ["_usr_name", "_mail_id"],
            required: ["_usr_name", "_mail_id"],
            properties: {
                _usr_name: {
                    bsonType: "string",
                    description: "user name"
                },
                _mail_id: {
                    bsonType: "long",
                    description: "mail unique serial number"
                }
            }
        }
    }
  }, function(err, res) {
    if (err) throw err;
    console.log("Collection Emails!");
    triggers(db.collection('Emails')).insert(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                db.EmailWarehouse.findOne({_mail_id: query._mail_id}, function(err, mail){
                    if(mail){
                        next();
                    }else{
                        next(new Error());
                    }
                })
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Emails')).update(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                db.EmailWarehouse.findOne({_mail_id: query._mail_id}, function(err, mail){
                    if(mail){
                        next();
                    }else{
                        next(new Error());
                    }
                })
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Emails')).remove(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                db.EmailWarehouse.findOne({_mail_id: query._mail_id}, function(err, mail){
                    if(mail){
                        next();
                    }else{
                        next(new Error());
                    }
                })
            }else{
                next(new Error());
            }
        })
    });
  });
  db.createCollection("Chats", {
    validator:{ 
        $jsonSchema: {
            bsonType: "object",
            unique: ["_usr_name", "_chat_name"],
            required: ["_chat_name"],
            properties: {
                _chat_name: {
                    bsonType: "string",
                    description: "chat room name"
                },
                _usr_name: {
                    bsonType: "string",
                    default: null,
                    description: "user name"
                }
            }
        }
    }
  }, function(err, res) {
    if (err) throw err;
    console.log("Collection Chats!");
    triggers(db.collection('Chats')).insert(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Chats')).update(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
    triggers(db.collection('Chats')).remove(function(query, next){
        db.Users.findOne({_usr_name: query._usr_name}, function(err, result){
            if(result){
                next();
            }else{
                next(new Error());
            }
        })
    });
  });
  mydb.close();
});



