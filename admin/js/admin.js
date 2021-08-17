if(sessionStorage.getItem("login") == null)
{
    document.body.style.display = "none";
    location.href = "https://rwdesigner.pl";
}
else
{
$(document).ready(function(){
	
	function createElementTxt(section, labelHTML, inputTxtId)
	{		
		let container = document.getElementById(section);
		let label = document.createElement("label");
		let inputTxt = document.createElement("input");
		
		label.innerHTML = labelHTML;
		inputTxt.type = "text";
		inputTxt.setAttribute("id", inputTxtId);
			
		container.appendChild(label);
		container.appendChild(inputTxt);
	}
	
	function createElementButton(section, acceptId, cancelId)
	{
		let container = document.getElementById(section);
		let accept = document.createElement("input");
		let cancel = document.createElement("input");
		
		accept.type = "button";
		cancel.type = "button";
		
		accept.value = "Zapisz";
		cancel.value = "Anuluj";
		
		accept.setAttribute("class", "buttons");
		cancel.setAttribute("class", "buttons");
		
		accept.setAttribute("id", acceptId);
		cancel.setAttribute("id", cancelId);
		
		container.appendChild(cancel);
		container.appendChild(accept);
	}
	
	createElementTxt("addUserSection", "Nazwa użytkownika", "username");
	createElementTxt("addUserSection", "Hasło", "password");
	createElementButton("addUserSection", "addUserAccept", "addUserCancel");
	
	createElementTxt("changePasswordSection", "Nazwa użytkownika", "usernameChangePassword");
	createElementTxt("changePasswordSection", "Hasło", "passwoerdChangePassword");
	createElementButton("changePasswordSection", "changePasswordAccept", "changePasswordCancel");
	
	
	createElementTxt("deleteUserSection", "Nazwa użytkownika", "deluser");
	createElementButton("deleteUserSection", "delUserAccept", "delUserCancel");

	
	$("#addUser").click(function(){
		
		$("#addUserSection").show("fast");
			
		$("#addUserAccept").click(function(){
			
			if($("#username").val() != "" && $("#password").val() != "")
			{
				$.post("../admin/php/addUser.php", {"username": $("#username").val(), "password": $("#password").val()});
			
				document.location.reload();
			}
			
			else
			{
				$("#username").css({"border": "1px solid red"});
				
				$("#password").css({"border": "1px solid red"});
			}
		});
		
		$("#addUserCancel").click(function(){
			
			$("#addUserSection").hide("fast");
			
			$("#username").css({"border": "1px solid rgb(209,234,0)"});
				
			$("#password").css({"border": "1px solid rgb(209,234,0)"});
		});
	});
	
	$("#changePassword").click(function(){
		
		$("#changePasswordSection").show("fast");
		
		$("#changePasswordAccept").click(function(){
			
			if($("#usernameChangePassword").val() != "" && $("#passwoerdChangePassword").val() != "")
			{
				$.post("../admin/php/changePassword.php", {"username": $("#usernameChangePassword").val(), "password": $("#passwoerdChangePassword").val()});
			
				document.location.reload();
			}
			
			else
			{
				$("#usernameChangePassword").css({"border": "1px solid red"});
				
				$("#passwoerdChangePassword").css({"border": "1px solid red"});
			}
		});
		
		$("#changePasswordCancel").click(function(){
			
			$("#changePasswordSection").hide("fast");
			
			$("#usernameChangePassword").css({"border": "1px solid rgb(209,234,0)"});
				
			$("#passwoerdChangePassword").css({"border": "1px solid rgb(209,234,0)"});
		});
	});
	
	$("#delUser").click(function(){
		
		$("#deleteUserSection").show("fast");
		
		$("#delUserAccept").click(function(){
			
			if($("#deluser").val() != "")
			{
				$.post("../admin/php/deleteUser.php", {"username": $("#deluser").val()});
			
				document.location.reload();
			}
			
			else
			{
				$("#deluser").css({"border": "1px solid red"});
			}
		});
		
		$("#delUserCancel").click(function(){
			
			$("#deleteUserSection").hide("fast");
			
			$("#deluser").css({"border": "1px solid rgb(209,234,0)"});
		});
	});
	
	$.post("../admin/php/getLogin.php", function(data){
		
		let username = $("name", data);
		let container = document.getElementById("userList");
		let orderList = document.createElement("ol");
				
		for(let i = 0; i < username.length; i++)
		{
			let listItem = document.createElement("li");
			listItem.append(username[i]);
			orderList.appendChild(listItem);
			container.appendChild(orderList);
		}
	});
});
}