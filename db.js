//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, useremail TEXT)";
var selectAllStatement = "SELECT * FROM Contacts";
var insertStatement = "INSERT INTO Contacts (username, useremail) VALUES (?, ?)";
var updateStatement = "UPDATE Contacts SET username = ?, useremail = ? WHERE id=?";
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE Contacts";
 
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;

/////////////////////// new ///////////////////
//var db2 = openDatabase("eCommerceDB", "1.0", "Address Book", 200000);

var createUser = "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT," +
		"username TEXT, password TEXT, role TEXT, fname TEXT, lname TEXT, mobile TEXT, address TEXT, email TEXT)";
var addUser = "INSERT INTO users (username, password, role, fname, lname, mobile, address, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

var createFeedback = "CREATE TABLE IF NOT EXISTS feedback(id INTEGER PRIMARY KEY AUTOINCREMENT,userid TEXT, text TEXT, status TEXT)";
var addFeedback = "INSERT INTO feedback (userid, text, status) VALUES (?, ?, ?)";
var getFeedbacks = "SELECT * FROM feedback";


//////////////////////////////////////////////////

function initDatabase() {
	try { if (!window.openDatabase) { alert('Databases are not supported in this browser.'); } else {createTable(); } }
    catch (e) { if (e == 2) { console.log("Invalid database version.");} else { console.log("Unknown error " + e + "."); } 
        return;
    }
}
 
function createTable() {
	db.transaction(function (tx) { tx.executeSql(createUser, [], showRecords, onError); });
	db.transaction(function (tx) { tx.executeSql(createFeedback, [], showRecords, onError); });
	db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
}
 
function add() {
	//var usernametemp = $('input:text[id=username]').val();
	//var useremailtemp = $('input:text[id=useremail]').val();
	db.transaction(function (tx) { tx.executeSql(addFeedback, ["13", "welldone", "pending"], loadAndReset, onError); });
	//alert("Record Saved!");
	
}

function get(i,fn) {
    db.transaction(function (tx) {
    	tx.executeSql("SELECT * FROM Contacts", [], function (tx, result) {
            dataset = result.rows;
            item = dataset.item(i);
            var rt = item[fn];
            console.log(rt);
            return rt;
        });
    });  
}

function gets(i) {

    db.transaction(function (tx) {
    	 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
            	console.log(item['username']);

            
            }
 
        });
 
    });

}

function insertRecord() {
	var usernametemp = $('input:text[id=username]').val();
	var useremailtemp = $('input:text[id=useremail]').val();
	db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, useremailtemp], loadAndReset, onError); });
	////////////////////////////////////
	var usernametemp = $('input:text[id=username]').val();
	var useremailtemp = $('input:text[id=useremail]').val();
	db.transaction(function (tx) { tx.executeSql(addFeedback, [usernametemp, useremailtemp], loadAndReset, onError); });
	alert("Record Saved!");
	
	//tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}
 
function deleteRecord(id) {
	var iddelete = id.toString();
	db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
    resetForm();
 
}
 
function updateRecord() // Get id of record . Function Call when Delete Button Click..
 
{
 
    var usernameupdate = $('input:text[id=username]').val().toString();
 
    var useremailupdate = $('input:text[id=useremail]').val().toString();
 
    var useridupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });
 
}
 
function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
 
{
 
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
 
    resetForm();
 
    initDatabase();
 
}
 
function loadRecord(i) // Function for display records which are retrived from database.
 
{
 
    var item = dataset.item(i);
 
    $("#username").val((item['username']).toString());
 
    $("#useremail").val((item['useremail']).toString());
 
    $("#id").val((item['id']).toString());
 
}
 
function resetForm() // Function for reset form input values.
 
{
 
    $("#username").val("");
 
    $("#useremail").val("");
 
    $("#id").val("");
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 
    resetForm();
 
    showRecords()
 
}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}
 
function showRecords() // Function For Retrive data from Database Display records as list
 
{
 
    $("#results").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var linkeditdelete = '<li>' + item['username'] + ' , ' + item['useremail'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
 
                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
 
                $("#results").append(linkeditdelete);
 
            }
 
        });
 
    });
 
}
 
$(document).ready(function () // Call function when page is ready for load..
 
{
;
 
$("body").fadeIn(2000); // Fede In Effect when Page Load..
initDatabase();
 
$("#testbtn").click(add);
$("#testbtn").click(get(2, "username"));
$("#submitButton").click(insertRecord);
$("#btnUpdate").click(updateRecord);
$("#btnReset").click(resetForm);
$("#btnDrop").click(dropTable);
});
 