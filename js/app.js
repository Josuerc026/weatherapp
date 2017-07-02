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

            //TEST RESPONSE IN THE CONSOLE
            console.log(data);
            console.log(data.name);
            console.log(data.weather[0].description);
            console.log(data.weather[0].icon);
            
            renderHTML(data);
         }
     });
  }  

  var validateZip = function(input){
  	   if(input.length < 5){
  	   	  alert("enter full zip");
  	   }
  }
  
  var renderHTML = function(data){
            //temperature conversion
         	var convertemp = (1.8 * (data.main.temp - 273) + 32);
         	var tempString = convertemp.toString();
         	var fahrenheit = tempString.substring(0,tempString.indexOf('.'));

         	var icon = "http://openweathermap.org/img/w/"+ data.weather[0].icon +".png";
             
            weatherDescription = "<img src='"+ icon +"'>";

            weatherDescription += "<h1>Weather in " + data.name + "</h1> ";
            weatherDescription += "<p>" + fahrenheit  + "&deg;F with " + data.weather[0].description;

            weatherDescription += "</p>";

            weatherInfoContainer.innerHTML = weatherDescription;
  }

  $("button").on("click",weatherCall);

    $(document).keypress(function(e) {
      if(e.which == 13 && userInput.val() !== "") {
          weatherCall();
      }
  });

});


