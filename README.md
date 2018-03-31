Test credential

email:admin@email.com

password: admin

user@email.com

user


====================== Info about database ========================== By Leon
List of available table:
  Users (for user profile information)
  Posts (for Moments post)
  Pics (for storing pictures)
  Emails (for each user's email logs)
  EmailWarehouse (for organizing all emails in this server)
  User_Rooms (for organizing which rooms that each user participates)
  Room_ChatHistory (Log of communication for each chat room)
  
List of available custom operations
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
##User_Rooms
    roomInsert(database, query, callback) -for insert or update
    roomUpdate(database, query, callback) -for update
    roomRemove(database, query, callback) -for remove

*Please do not use default built in functions from mongodb except UPDATE function.
