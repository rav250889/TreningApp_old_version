$("document").ready(function(){
	
	let getlogin = localStorage.getItem("login");
	
	$("#login").val(getlogin);
	
	let error = document.createElement("div");
	
	error.setAttribute("id", "error");
	
	let logContainer = document.getElementById("logContainer");
	
	logContainer.appendChild(error);
	
	$("#submit").click(function(){
				
		if($("#login").val() != "" && $("#password").val() != "")
		{
			$.post("php/login.php",{"login": $("#login").val()},function(data){

				var login = $("name", data);
				
				var password = $("password", data);
				
				try
				{
					if($("#password").val() != password[0].innerHTML)
					{
						error.innerHTML = "*Sprawdź czy wpisałeś poprawny login i hasło";
						
						return;
					}

					if($("#login").val() === login[0].innerHTML && $("#password").val() === password[0].innerHTML)
					{	
						if($("#login").val() == "admin")
						{
							$.post("php/link.php", {"login": $("#login").val()}, function(data){
								
								let link = $("type", data);
                                
                                sessionStorage.setItem("login", $("#login").val());
								
								location.href = link[0].innerHTML;
							});
						}
						
						else
						{
							$.post("php/link.php", {"login": $("#login").val()}, function(data){

								let link = $("type", data);

								localStorage.setItem("login", $("#login").val());

								location.href = link[0].innerHTML;
							});
						}
					}
				}
				
				catch(err)
				{
					error.innerHTML = "*Sprawdź czy wpisałeś poprawny login i hasło";
				}
			});
		}
		
		else
		{
			error.innerHTML = "*Sprawdź czy wpisałeś poprawny login i hasło";
		}
	});
});