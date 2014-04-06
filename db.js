//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, role TEXT, fname TEXT, lname TEXT, mobile TEXT, address TEXT, email TEXT)";
var insertStatement = "INSERT INTO users (username, password) VALUES (?, ?)";
var selectAllStatement = "SELECT * FROM users";
var updateStatement = "UPDATE users SET username = ?, password = ? WHERE id=?";
var deleteStatement = "DELETE FROM users WHERE id=?";
var dropStatement = "DROP TABLE users";
 
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;

function initDatabase() {
	try { if (!window.openDatabase) { alert('Databases are not supported in this browser.'); } else {
		db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
	
	} }
    catch (e) { if (e == 2) { console.log("Invalid database version.");} else { console.log("Unknown error " + e + "."); } 
        return;
    }
}


/**
function add() {
	//var usernametemp = $('input:text[id=username]').val();
	//var passwordtemp = $('input:text[id=password]').val();
	db.transaction(function (tx) { tx.executeSql(addFeedback, ["13", "welldone", "pending"], loadAndReset, onError); });
	//alert("Record Saved!");
	
}

function get(i,fn) {
    db.transaction(function (tx) {
    	tx.executeSql("SELECT * FROM users", [], function (tx, result) {
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
*/
function insertRecord() {
	var usernametemp = $('input:text[id=username]').val();
	var passwordtemp = $('input:text[id=password]').val();
	db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, passwordtemp], loadAndReset, onError); });
	
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
 
    var passwordupdate = $('input:text[id=password]').val().toString();
 
    var useridupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, passwordupdate, Number(useridupdate)], loadAndReset, onError); });
 
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
 
    $("#password").val((item['password']).toString());
 
    $("#id").val((item['id']).toString());
 
}
 
function resetForm() // Function for reset form input values.
 
{
 
    $("#username").val("");
 
    $("#password").val("");
 
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
 
                var linkeditdelete = '<li>' + item['username'] + ' , ' + item['password'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
 
                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
 
                $("#results").append(linkeditdelete);
 
            }
 
        });
 
    });
 
}
 
$(document).ready(function () { ;
	$("body").fadeIn(2000);
	initDatabase(); 
		
	$("#addbtn").click(add);
	$("#getbtn").click(get);
	//$("#testbtn").click(get(2, "username"));
	$("#submitButton").click(insertRecord);
	$("#btnUpdate").click(updateRecord);
	$("#btnReset").click(resetForm);
	$("#btnDrop").click(dropTable);
});

function add() { db.transaction(function (tx) { tx.executeSql("INSERT INTO users (username, password) VALUES (?, ?)", ["user5", "12345"], loadAndReset, onError); }); }

function get() { db.transaction(function (tx) { tx.executeSql("SELECT * FROM users", [], function (tx, result) {		 
    dataset = result.rows;
    item = dataset.item(2);
    alert(item['username']);


});

}); }

function display() { console.log("hello"); }