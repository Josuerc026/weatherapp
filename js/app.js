//WEATHER MINI APP USING JQUERY AJAX METHOD 
//AND OPEN WEATHER API - REFERENCE API KEY 
$(document).ready(function(){

  var userInput = $("input");
  var weatherInfoContainer = $("div#weather-info")[0];

  var weatherCall = function(){

  	var userzip = userInput.val();
  	validateZip(userzip);

    $.ajax({
         url: "http://api.openweathermap.org/data/2.5/weather?zip="+ userzip +",us&appid=3d89d40ee37e08d8c9b4ec2095e623b7",
         type: 'GET',
         data: {
         	format: "json"
         },
         error: function(){
              console.log("there was an error");
         },
         dataType: "jsonp",
         success: function(data){
            renderHTML(data);

            //TEST RESPONSE IN THE CONSOLE
            console.log(data);
            console.log(data.name);
            console.log(data.weather[0].description);
            console.log(data.weather[0].icon);
         }
     });
  }  

  var validateZip = function(input){
  	   if(input.length < 5){
  	   	  alert("enter full zip");
  	   }
  }

  //HELPER FUNCTION TO RETURN TEMPERATURE AS FAHRENHEIT 

  Handlebars.registerHelper("fahrenheit", function(temp){
  	        //temperature conversion
            var convertemp = (1.8 * (temp - 273) + 32);
         	var tempString = convertemp.toString();
         	var fahrenheit = tempString.substring(0,tempString.indexOf('.'));
         	return fahrenheit;
  });

  var renderHTML = function(data){

         	var staticTemplate = document.getElementById("weather-template").innerHTML;
         	var compiledTemp = Handlebars.compile(staticTemplate);
         	var generated = compiledTemp(data);

         	weatherInfoContainer.innerHTML = generated;
         	//var icon = "http://openweathermap.org/img/w/"+ data.weather[0].icon +".png";
            //weatherDescription = "<img src='"+ icon +"'>"; //ICON
            //weatherDescription += "<h1>Weather in " + data.name + "</h1> "; //NAME OF CITY
            //weatherDescription += "<p>" + fahrenheit  + "&deg;F with " + data.weather[0].description; //BRIEF DESCRIPTION
            //weatherDescription += "</p>";
            //weatherInfoContainer.innerHTML = weatherDescription;
  }

  var timeOfDay = function(){
  	   var timeOfDayContainer = document.querySelector("#time-of-day");
       var hour = new Date().getHours();
       //IF HOUR IS BEFORE NOON (< 12pm)
       if(hour < 12){
             timeOfDayContainer.innerHTML = "Good Morning!";
       }
       //IF HOUR IS AFTER NOON (> 12pm and <= 5pm)
       if(hour >= 12 && hour <= 17){
             timeOfDayContainer.innerHTML = "Good Afternoon!";
       }
       //IF HOUR IS AFTER NOON (>= 6pm)
       if(hour >= 18){
       	     timeOfDayContainer.innerHTML = "Good Evening!";
       }
  }
   
  $("button").on("click",weatherCall);
  $(document).keypress(function(e){
      if(e.which == 13 && userInput.val() !== "") {
          weatherCall();
      }
  });

  timeOfDay();
});


