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
    db.collection('Users').findOne({_usr_name: query._usr_name}, function(err, user){
        if(user){
            chatRemove(db, {_usr_name: query._usr_name}, callback);
            friendRemove(db, {_usr_name: query._usr_name}, callback);
            postRemove(db, {_usr_name: query._usr_name}, callback);
            emailRemove(db, query, callback);
        }
    })
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

//update function is normal so just use update()