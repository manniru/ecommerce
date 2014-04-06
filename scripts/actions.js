
$(document).ready(function() {
	$('#username1').text(localStorage["username"]);
	var db = openDatabase('db', '1.0', 'eCommerce DB', 2 * 1024 * 1024);
	
    $("#registerbtn").click(function(){
        console.log("Register");
        var username = $('#username').val();
        var password = $('#password').val();
        var fullname = $('#fullname').val();
        var mobileno = $('#mobileno').val();
        var email = $('#email').val();
        
        
        db.transaction(function (tx) {	
        	tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, role TEXT, fullname TEXT, mobileno TEXT, email TEXT, cctype TEXT, ccname TEXT, ccno TEXT)');
        	tx.executeSql('INSERT INTO users (username, password, role, fullname, mobileno, email) VALUES ("'+username+'", "'+password+'", "customer", "'+fullname+'", "'+mobileno+'", "'+email+'")');
        	console.log("Record saved!");
        	
          //document.querySelector('#status').innerHTML =  '<p>Log message created and row inserted.</p>';
        });
        
    });
    
    
    $("#loginbtn").click(function(){
    	var user1 = $('#username1').val();
		var pass1 = $('#password1').val();
		localStorage.setItem("username", user1);
		localStorage.setItem("password", pass1);
		//localStorage.setItem("username", user1);
		console.log(localStorage["username"]);

        
    });
    

});