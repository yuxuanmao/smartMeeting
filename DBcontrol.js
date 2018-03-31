/*
This file contains all available control functions for Database.
In order to maintain the integrity of DB, I made several function for Insert and Remove rows from each table.
There is no update function as I think there is no need to check specifically unless you need to change primary key
or foregin key.
The following is the list of functions available
##Users table
    userInsert(database, query, callback) -for insert
    userRemove(database, query, callback) -for remove user info and all other corresponding info in other table
##Posts table
    postInsert(database, query, callback) -for insert
    postRemove(database, query, callback) -for remove
##Pics table
    picInsert(database, query, callback) -for insert
    picRemove(database, query, callback) -for remove
##EmailWarehouse table
    emailwarehouseInsert(database, query, callback) -for insert
##Emails table
    emailInsert(database, query, callback) -for insert
    emailRemove(database, query, callback) -for remove email info and corresponding info in email warehouse
##Chats
    chatInsert(database, query, callback) -for insert
    chatRemove(database, query, callback) -for remove
##User_Rooms
    roomInsert(database, query, callback) -for insert or update
    roomUpdate(database, query, callback) -for update
    roomRemove(database, query, callback) -for remove

*Please do not use default built in functions from mongodb except UPDATE function.
*/

exports.userInsert = function(db, query, callback){
    db.collection('Users').findOne({_usr_name: query._usr_name}, function(err, result){
        if(result){
            callback(new Error());
        }else{
            db.collection('Users').insert(query, callback());
        }
    })
}

exports.userRemove = function(db, query, callback){
    db.collection('Users').remove(query);
    chatRemove(db, {_usr_name: query._usr_name}, callback);
    friendRemove(db, {_usr_name: query._usr_name}, callback);
    postRemove(db, {_usr_name: query._usr_name}, callback);
    emailRemove(db, query, callback);
}

exports.postInsert = function(db, query, callback){
    db.collection('Posts').findOne({_post_id: query._post_id}, function(err, post){
        if(!post){
            db.collection('Users').findOne({_usr_name: query._usr_name}, function(err, result){
                if(result){
                    db.collection('Pics').findOne({_pic_id: query._pic_id}, function(err, pic){
                        if(pic){
                            db.collection('Posts').insert(query, callback());
                        }else{
                            callback(new Error());
                        }
                    }) 
                }else{
                    callback(new Error());
                }
            })
        }
    })
}

exports.postRemove = function(db, query, callback){
    db.collection('Posts').remove(query, callback());
    return;
}

exports.picInsert = function(db, query, callback){
    db.collection('Pics').findOne({_pic_id: query._pic_id}, function(err, pic){
        if(!pic){
            db.collection('Pics').insert(query, callback());
        }
    })
}

exports.picRemove = function(db, query, callback){
    db.collection('Pics').remove(query, callback());
    return;
}

exports.friendInsert = function(db, query, callback){
    db.collection('Friends').findOne({_usr_name: query._usr_name, _friend_name: query._friend_name}, function(err, friend){
        if(friend == null){
            console.log("ok");
            db.collection('Users').find({$and: [{_usr_name: query._usr_name}, {_usr_name: query._friend_name}]}, 
                function(err, result){
                    if(result){
                        db.collection('Friends').insert(query, callback());
                    }
                })
        }
    })
}

exports.friendRemove = function(db, query, callback){
    db.collection('Friends').remove(query, callback());
    return;
}

exports.emailwarehouseInsert = function(db, query, callback){
    db.collection('EmailWarehouse').findOne({_mail_id: query._mail_id}, function(err, mail){
        if(!mail){
            db.collection('EmailWarehouse').insert(query, callback());
        }
    })
}

exports.emailInsert = function(db, query, callback){
    db.collection('Emails').findOne({_usr_name: query._usr_name, _mail_id: query._mail_id}, function(err, mail){
        if(!mail){
            db.collection('EmailWarehouse').findOne({_mail_id: query._mail_id}, function(err, result){
                if(result){
                    db.collection('Emails').insert(query, callback());
                }
            })
        }
    })
}

exports.emailRemove = function(db, query, callback){
    db.collection("Emails").find({_usr_name: 'userA'}).toArray(function(err, result){
        db.collection('Emails').remove({_usr_name: query._usr_name}, function(){
            for(var i=0; i<result.length; i++){
                console.log(result[i]);
                db.collection("EmailWarehouse").remove({_mail_id: result[i]._mail_id});
            }
        });
    });
}

exports.chatInsert = function(db, query, callback){
    db.collection('Chats').findOne({_chat_name: query._chat_name, _usr_name: query._usr_name}, function(err, chat){
        if(!chat){
            db.collection('Users').findOne({_usr_name: query._usr_name}, function(err, result){
                if(result){
                    db.collection('Chats').insert(query, callback());
                }
            })
        }
    })
}

exports.chatRemove = function(db, query, callback){
    db.collection('Chats').remove(query, callback());
}

exports.roomInsert = function(db, query, callback){
    db.collection('Users').findOne({_usr_name: query._usr_name}, function(err, user){
        if(err) throw err;
        if(!user){
            db.collection('User_Rooms').insert(query, function(err, res){
                if(err) throw err;
                console.log(res);
            });
        }else{
            exports.roomUpdate(db, query, callback);
            
        }
    })
}

exports.roomUpdate = function(db, query, callback){
    db.collection('User_Rooms').findOne({_usr_name: query._usr_name}, function(err, user){
        //var rooms = typeof user.rooms !== "undefined" ? user.rooms : [];
        var flag = false;
        if(!user){
            db.collection('User_Rooms').insert(query, function(err, res){
                if(err) throw err;
                console.log(res);
            });
        } else {

            for(var i=0; i<query.rooms.length; i++){
                if(typeof user.rooms !== "undefined"){
                    for(var j=0; j<user.rooms.length; i++){
                        if(query.rooms[i] == user.rooms[j]){
                        flag = true;
                        break;
                        }
                    }
                }
                if(flag == false){
                    rooms.push(query.rooms[i]);
                }else{
                    flag = false;
                }
            }
            db.collection('User_Rooms').updateOne({"_id": user._id}, {$set: {rooms: rooms}}, function(err, res){
                if(err) throw err;
                //console.log(res);
            })
        }
        
        
    })
}

exports.roomRemove = function(db, query, callback){
    db.collection('User_Rooms').remove({_usr_name: query._usr_name}, function(err, user){
        if(err) throw err;
    })
}

//update function is normal so just use update()