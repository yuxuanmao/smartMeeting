Test credential

email:admin@email.com

password: admin

user@email.com

user


====================== Info about database ========================== By Leon<br />
List of available table:<br />
__Users (for user profile information)<br />
__Posts (for Moments post)<br />
__Pics (for storing pictures)<br />
__Emails (for each user's email logs)<br />
__EmailWarehouse (for organizing all emails in this server)<br />
__User_Rooms (for organizing which rooms that each user participates)<br />
__Room_ChatHistory (Log of communication for each chat room)<br />
  
List of available custom operations<br />
##Users table<br />
____userInsert(database, query, callback) -for insert<br />
____userRemove(database, query, callback) -for remove user info and all other corresponding info in other table<br />
##Posts table<br />
____postInsert(database, query, callback) -for insert<br />
____postRemove(database, query, callback) -for remove<br />
##Pics table<br />
____picInsert(database, query, callback) -for insert<br />
____picRemove(database, query, callback) -for remove<br />
##EmailWarehouse table<br />
____emailwarehouseInsert(database, query, callback) -for insert<br />
##Emails table<br />
____emailInsert(database, query, callback) -for insert<br />
____emailRemove(database, query, callback) -for remove email info and corresponding info in email warehouse<br />
##User_Rooms<br />
____roomInsert(database, query, callback) -for insert or update<br />
____roomUpdate(database, query, callback) -for update<br />
____roomRemove(database, query, callback) -for remove<br />
<br />
*Please do not use default built in functions from mongodb except UPDATE function.<br />
