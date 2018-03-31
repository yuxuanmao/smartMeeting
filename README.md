Test credential

email:admin@email.com

password: admin

user@email.com

user


====================== Info about database ========================== By Leon<br />
List of available table:<br />
&nbsp&nbspUsers (for user profile information)<br />
&nbsp&nbspPosts (for Moments post)<br />
&nbsp&nbspPics (for storing pictures)<br />
&nbsp&nbspEmails (for each user's email logs)<br />
&nbsp&nbspEmailWarehouse (for organizing all emails in this server)<br />
&nbsp&nbspUser_Rooms (for organizing which rooms that each user participates)<br />
&nbsp&nbspRoom_ChatHistory (Log of communication for each chat room)<br />
  
List of available custom operations<br />
##Users table<br />
&nbsp&nbsp&nbsp&nbspuserInsert(database, query, callback) -for insert<br />
&nbsp&nbsp&nbsp&nbspuserRemove(database, query, callback) -for remove user info and all other corresponding info in other table<br />
##Posts table<br />
&nbsp&nbsp&nbsp&nbsppostInsert(database, query, callback) -for insert<br />
&nbsp&nbsp&nbsp&nbsppostRemove(database, query, callback) -for remove<br />
##Pics table<br />
&nbsp&nbsp&nbsp&nbsppicInsert(database, query, callback) -for insert<br />
&nbsp&nbsp&nbsp&nbsppicRemove(database, query, callback) -for remove<br />
##EmailWarehouse table<br />
&nbsp&nbsp&nbsp&nbspemailwarehouseInsert(database, query, callback) -for insert<br />
##Emails table<br />
&nbsp&nbsp&nbsp&nbspemailInsert(database, query, callback) -for insert<br />
&nbsp&nbsp&nbsp&nbspemailRemove(database, query, callback) -for remove email info and corresponding info in email warehouse<br />
##User_Rooms<br />
&nbsp&nbsp&nbsp&nbsproomInsert(database, query, callback) -for insert or update<br />
&nbsp&nbsp&nbsp&nbsproomUpdate(database, query, callback) -for update<br />
&nbsp&nbsp&nbsp&nbsproomRemove(database, query, callback) -for remove<br />
<br />
*Please do not use default built in functions from mongodb except UPDATE function.<br />
