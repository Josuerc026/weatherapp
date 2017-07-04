//WEATHER MINI APP USING JQUERY AJAX METHOD
//AND OPEN WEATHER API - REFERENCE API KEY
$(document).ready(function(){

  var userInput = $("input");
  var weatherInfoContainer = $("div#weather-info")[0];

  var weatherCall = function(){

  	var userzip = userInput.val();
  	//validateZip(userzip);

    $.ajax({
         url: "https://api.wunderground.com/api/78d3a733887193b4/forecast/geolookup/conditions/q/"+ userzip +".json",
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
            console.log(data.current_observation.icon_url);
            console.log(data.location.city);
            console.log(data.location.state);
            console.log(data.location.zip);
            console.log(data.current_observation.weather);
            console.log(data.current_observation.temp_c);
            console.log(data.current_observation.temp_f);
            console.log(data.current_observation.precip_today_metric);
            console.log(data.current_observation.relative_humidity);
         }
     });
  }
//HELPER FUNCTION TO RETURN FORMATTTED TEMPERATURE
Handlebars.registerHelper('realTemp', function(temp){
   var stringTemp = temp.toString();
   if(stringTemp.indexOf(".") <= -1){
       return stringTemp;
   }
   return stringTemp.substring(0, stringTemp.indexOf("."));
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
       //IF HOUR IS BEFORE NOON (>= 5 and < 12pm)
       if(hour >= 5 && hour < 12){
             timeOfDayContainer.innerHTML = "Good Morning!";
       }
       //IF HOUR IS AFTER NOON (> 12pm and <= 5pm)
       if(hour >= 12 && hour <= 17){
             timeOfDayContainer.innerHTML = "Good Afternoon!";
       }
       //IF HOUR IS AFTER 6 PM(>= 6pm and < 10pm)
       if(hour >= 18 && hour < 22){
       	     timeOfDayContainer.innerHTML = "Good Evening!";
       }
       //IF HOUR IS AFTER 10PM(>= 10pm and < 5pm)
       if(hour >=22 && hour < 5){
          timeOfDayContainer.innerHTML = "Good Night!";
       }
  }
  var farOn = true;
  var changeScale = function(toggleBtn){
        var far = toggleBtn.previousElementSibling.previousElementSibling;
        var cel = toggleBtn.previousElementSibling;
        var forecastContainer = toggleBtn.parentNode.nextElementSibling;
        var forecastCel = forecastContainer.querySelectorAll('.celsius');
        var forecastFar = forecastContainer.querySelectorAll('.fahrenheit');
        if(farOn === true){
          far.classList.add("hide");
          cel.classList.remove("hide");
          for(var i = 0; i < forecastCel.length; i++){
             forecastCel[i].classList.remove("hide");
          }
          for(var i = 0; i < forecastFar.length; i++){
             forecastFar[i].classList.add("hide");
          }
          farOn = false;
        }else{
          far.classList.remove("hide");
          cel.classList.add("hide");
          for(var i = 0; i < forecastCel.length; i++){
             forecastCel[i].classList.add("hide");
          }
          for(var i = 0; i < forecastFar.length; i++){
             forecastFar[i].classList.remove("hide");
          }
          farOn = true;
        }


  }

  $("button#query-submit").on("click",weatherCall);
  $(document).keypress(function(e){
      if(e.which == 13 && userInput.val() !== "") {
          weatherCall();
      }
  });
  var active = function(e){
      if(e.target.matches("button.scale-toggle")){
        changeScale(e.target);
      }
  }
  var scaleToggleButton = document.querySelector("body");
  scaleToggleButton.onclick = active;
  timeOfDay();
});
