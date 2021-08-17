 if(localStorage.getItem("login") == null)
{
    document.body.style.display = "none";
    location.href = "https://rwdesigner.pl";
}
else
{
function start()
{	
	$("#start_workout").off("click");

	$("#counter").show(200);

	let tableDay = document.getElementsByTagName("tr");

	let conunterButton = 1;

	let counterElementTR = 1;

	let series = tableDay[counterElementTR].childNodes.item(1);

	$("#counter").text(conunterButton);

	tableDay[counterElementTR].style.background = "rgba(240,128,0,0.3)";

	$("#counter").click(function(){

		try
		{
			tableDay[counterElementTR].style.background = "rgba(240,128,0,0.3)";

			$(this).text(conunterButton);

			if(Number($("#counter").text()) == Number($(series).text()))
			{
				tableDay[counterElementTR].style.background = "rgba(13,166,0,0.3)";

				conunterButton = 0;

				counterElementTR++;
			}

			conunterButton++;

			if(tableDay[counterElementTR] == undefined)
			{
				$("#counter").fadeOut(200);

				$("#start_workout").on("click", function(){

					$("table tr").css({"background": "none"});

					new Counter().start();

					let changeButtons = document.getElementsByClassName("change");

					for(let i = 0; i < changeButtons.length; i++)
					{
						changeButtons[i].disabled = true;
					}
				});

				let changeButtons1 = document.getElementsByClassName("change");

				for(let i = 0; i < changeButtons1.length; i++)
				{
					changeButtons1[i].disabled = false;
				}

				document.getElementById("new-position").disabled = false;

				document.getElementById("delete-position").disabled = false;
			}

			series = tableDay[counterElementTR].childNodes.item(1);

		}
		catch(err)
		{
			conunterButton = 0;
			return;
		}	
	});
} 

$("document").ready(function(){
		
	/*------------------------------------------------------
		*Pobieranie loginu z localstorage
	--------------------------------------------------------*/
	let loggedUser = document.getElementById("loggedUser");
	
	loggedUser.innerHTML = "Użytkownik: " + localStorage.getItem("login");
	/*------------------------------------------------------
		*Pobieranie aktualnej daty i dnia tygodnia
	--------------------------------------------------------*/
	let now = new Date();
	    
    const days = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    
    localStorage.setItem("day", days[now.getDay()]);
	
	let month = "";
	
	let dayNumber = "";
	
	if(now.getDate() <= 9) dayNumber = "0" + now.getDate();
	
	else dayNumber = now.getDate();
	
	if(now.getMonth() <= 9) month = "0" + (now.getMonth() + 1);
	
	else month = (now.getMonth() + 1);   
    
	let result = days[now.getDay()] + " " + dayNumber + "." + month + "." + now.getFullYear();
    
    $(".day").html(result);
	
	$("table").attr("id", days[now.getDay()]);
	
	/*------------------------------------------------------
		*pobieranie listy cwiczen z bazy danych oraz ich akt.
	--------------------------------------------------------*/
	$.post("../plan/php/getData.php", {"loginUser": localStorage.getItem("login"), "day": days[now.getDay()]}, function(data){
		
		let type = $("type", data);
		
		let series = $("series", data);
		
		let repetitions = $("repetitions", data);
		
		let counter = $("counter", data);
				
		for(let i = 0; i < type.length; i++)
		{
			let tr = document.createElement("tr");
						
			let workoutTdElement = document.createElement("td");
			
			let seriesTdElement = document.createElement("td");
			
			let repetitionsTdElement = document.createElement("td");
			
			let changeButtonElement = document.createElement("td");
			
			let input = document.createElement("input");
						
			input.type = "button";
			
			input.value = "Zmień";
			
			input.setAttribute("id", counter[i].innerHTML);
			
			input.setAttribute("class", "change");
		
			workoutTdElement.appendChild(type[i]);

			seriesTdElement.appendChild(series[i]);

			repetitionsTdElement.appendChild(repetitions[i]);

			changeButtonElement.appendChild(input);

			tr.appendChild(workoutTdElement);
			
			tr.appendChild(seriesTdElement);
			
			tr.appendChild(repetitionsTdElement);
			
			tr.appendChild(changeButtonElement);
			
			let table = document.getElementById(days[now.getDay()]);
			
			table.appendChild(tr);
	
			input.onclick = function()
			{
				if(input.value == "Zmień")
				{
					$("#changeData").fadeIn(500);

					$("table tr").css({"background": "none"});

					$("#acceptedChange").click(function(){
						
						if($("#workoutupdate").val() != "" && $("#seriesupdate").val() != "" && $("#repetitionsupdate").val() != "")
						{

							$.post("../plan/php/updatedata.php",
							{
								"login": localStorage.getItem("login"),

								"counter": input.getAttribute("id"),

								"day": days[now.getDay()],

								"workout": $("#workoutupdate").val(),

								"series": $("#seriesupdate").val(),

								"repetitions": $("#repetitionsupdate").val()
							});

							$("#changeData").fadeOut(500);

							document.location.reload();
						}
						
						else
						{
							$("#workoutupdate").css({"border": "1px solid red"});
				
							$("#seriesupdate").css({"border": "1px solid red"});

							$("#repetitionsupdate").css({"border": "1px solid red"});
						}
					});

					$("#cancelChange").click(function(){

						$("#changeData").fadeOut(500);
						
						document.location.reload();
					});
				}

				else if(input.value == "Usuń")
				{

					$.post("../plan/php/deletedata.php",
					{
						"login": localStorage.getItem("login"),

						"counter": input.getAttribute("id"),

						"day": days[now.getDay()]
					});

					document.location.reload();
					
				}
			}
		}
						
		$("#start_workout").click(function(){
			
			$("table tr").css({"background": "none"});
			
			start();
			
			let changeButtons = document.getElementsByClassName("change");
			
			for(let i = 0; i < changeButtons.length; i++)
			{
				changeButtons[i].disabled = true;
			}
			
			document.getElementById("new-position").disabled = true;
			
			document.getElementById("delete-position").disabled = true;
			
		});
	});
	
	$("#delete-position").click(function(){
			
		if($(this).val() == "Usuń")
		{
			$(".change").val("Usuń");

			$(this).val("Zmień");
		}
		
		else if($(this).val() == "Zmień")
		{
			$(".change").val("Zmień");

			$(this).val("Usuń");
		}
	});
	
	$("#new-position").click(function(){
        
        $("#changeData").fadeIn(500);
		        
        $("#acceptedChange").click(function(){
			
			if($("#workoutupdate").val() != "" && $("#seriesupdate").val() != "" && $("#repetitionsupdate").val() != "")
			{
				$.post("../plan/php/addworkout.php",
				{
					"login": localStorage.getItem("login"),

					"day": days[now.getDay()],

					"workout": $("#workoutupdate").val(),

					"series": $("#seriesupdate").val(),

					"repetitions": $("#repetitionsupdate").val()
				});
				
				$("#changeData").fadeOut(500);
				
				document.location.reload();
			}
			
			else
			{
				$("#workoutupdate").css({"border": "1px solid red"});
				
				$("#seriesupdate").css({"border": "1px solid red"});
				
				$("#repetitionsupdate").css({"border": "1px solid red"});
			}
        });

        $("#cancelChange").click(function(){

            $("#changeData").fadeOut(500);
			
			document.location.reload();
        });
    });
});
}