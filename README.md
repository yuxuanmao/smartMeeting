Test credential

email:admin@email.com

password: admin

user@email.com

user


====================== Info about database ========================== By Leon<br />
List of available table:
__Users (for user profile information)
__Posts (for Moments post)
__Pics (for storing pictures)
__Emails (for each user's email logs)
__EmailWarehouse (for organizing all emails in this server)
__User_Rooms (for organizing which rooms that each user participates)
__Room_ChatHistory (Log of communication for each chat room)
  
List of available custom operations<br />
##Users table
____userInsert(database, query, callback) -for insert
____userRemove(database, query, callback) -for remove user info and all other corresponding info in other table
##Posts table
____postInsert(database, query, callback) -for insert
____postRemove(database, query, callback) -for remove
##Pics table
____picInsert(database, query, callback) -for insert
____picRemove(database, query, callback) -for remove
##EmailWarehouse table
____emailwarehouseInsert(database, query, callback) -for insert
##Emails table
____emailInsert(database, query, callback) -for insert
____emailRemove(database, query, callback) -for remove email info and corresponding info in email warehouse
##User_Rooms
____roomInsert(database, query, callback) -for insert or update
____roomUpdate(database, query, callback) -for update
____roomRemove(database, query, callback) -for remove
<br />
*Please do not use default built in functions from mongodb except UPDATE function.
