Test credential

email:admin@email.com

password: admin

user@email.com

user


====================== Info about database ========================== By Leon<br />
List of available table:<br />
&nbsp;&nbsp;Users (for user profile information)<br />
&nbsp;&nbsp;Posts (for Moments post)<br />
&nbsp;&nbsp;Pics (for storing pictures)<br />
&nbsp;&nbsp;Emails (for each user's email logs)<br />
&nbsp;&nbsp;EmailWarehouse (for organizing all emails in this server)<br />
&nbsp;&nbsp;User_Rooms (for organizing which rooms that each user participates)<br />
&nbsp;&nbsp;Room_ChatHistory (Log of communication for each chat room)<br />
  
List of available custom operations<br />
##Users table<br />
&nbsp;&nbsp;&nbsp;&nbsp;userInsert(database, query, callback) -for insert<br />
&nbsp;&nbsp;&nbsp;&nbsp;userRemove(database, query, callback) -for remove user info and all other corresponding info in other table<br />
##Posts table<br />
&nbsp;&nbsp;&nbsp;&nbsp;postInsert(database, query, callback) -for insert<br />
&nbsp;&nbsp;&nbsp;&nbsp;postRemove(database, query, callback) -for remove<br />
##Pics table<br />
&nbsp;&nbsp;&nbsp;&nbsp;picInsert(database, query, callback) -for insert<br />
&nbsp;&nbsp;&nbsp;&nbsp;picRemove(database, query, callback) -for remove<br />
##EmailWarehouse table<br />
&nbsp;&nbsp;&nbsp;&nbsp;emailwarehouseInsert(database, query, callback) -for insert<br />
##Emails table<br />
&nbsp;&nbsp;&nbsp;&nbsp;emailInsert(database, query, callback) -for insert<br />
&nbsp;&nbsp;&nbsp;&nbsp;emailRemove(database, query, callback) -for remove email info and corresponding info in email warehouse<br />
##User_Rooms<br />
&nbsp;&nbsp;&nbsp;&nbsp;roomInsert(database, query, callback) -for insert or update<br />
&nbsp;&nbsp;&nbsp;&nbsp;roomUpdate(database, query, callback) -for update<br />
&nbsp;&nbsp;&nbsp;&nbsp;roomRemove(database, query, callback) -for remove<br />
<br />
*Please do not use default built in functions from mongodb except UPDATE function.<br />
