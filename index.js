$(document).ready(function() {
  var long;
  var lat;
  var a;

  // getting local longitude and latitude
  $.getJSON("https://freegeoip.net/json/?callback=?", function(a) {
    lat = a.latitude;
    long = a.longitude;

    // using a weather api to obtain local temperature, windspeed, etc..
    var api =
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=7049f84b626595ca413f13d7f9c4e1d0";

    $.getJSON(api)
      .done(function(data) {
        // temp in K, f, and C
        var kTemp = data.main.temp;
        var f = 9 / 5 * (kTemp - 273.15) - 32;
        var c = kTemp - 273.15;
        var fTemp = Math.ceil(f);
        var cTemp = Math.ceil(c);
        var tempSwap = true;
        var weatherType = data.weather[0].description;
        var pressure = data.main.pressure / 10;
        var windSpeed = data.wind.speed;
        var windSpeed1 = 3.6 * windSpeed;
        // var windSpeed2 = windSpeed1.toFixed(2);
        var city = data.name;
        var country = data.sys.country;

        $("#city").html(city);
        $("#weatherType").html(weatherType);
        $("#temp").html(fTemp);
        $("#country").html(country);
        $("#location").html(" " + city + "," + country);
        $("#temp").html(" " + cTemp + " °C");
        //shifting  between celsius and fahrenheit
        $("#lTemp").click(function() {
          if (tempSwap === false) {
            $("#temp").html(" " + cTemp + " °C");
            tempSwap = true;
          } else {
            $("#temp").html(" " + fTemp + " °F");
            tempSwap = false;
          }
        });
        $("#pressure").html(" " + pressure + " kPa");
        $("#windSpeed").html(" " + windSpeed1.toFixed(2) + " km/hr");

        // using switch statemnts to get the right background to match the weather condition

        function getWeatherCondition(weatherCond) {
          switch (weatherCond) {
            case "thunderstorm with light rain":
            case "thunderstorm with rain":
            case "thunderstorm with heavy rain":
            case "light thunderstorm":
            case "thunderstorm":
            case "heavy thunderstorm":
            case "ragged thunderstorm":
            case "thunderstorm with light drizzle":
            case "thunderstorm with drizzle":
            case "thunderstorm with heavy drizzle":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/167755/pexels-photo-167755.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "light intensity drizzle":
            case "drizzle":
            case "heavy intensity drizzle":
            case "light intensity drizzle rain":
            case "drizzle rain":
            case "heavy intensity drizzle rain":
            case "shower rain and drizzle":
            case "heavy shower rain and drizzle":
            case "shower drizzle":
            case "light rain":
            case "moderate rain":
            case "heavy intensity rain":
            case "very heavy rain":
            case "extreme rain":
            case "light intensity shower rain":
            case "shower rain":
            case "heavy intensity shower rain":
            case "ragged shower rain":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "freezing rain":
            case "light snow":
            case "snow":
            case "heavy snow":
            case "sleet":
            case "shower sleet":
            case "light rain and snow":
            case "rain and snow":
            case "light shower snow":
            case "shower snow":
            case "heavy shower snow":
            case "squalls":
            case "hail":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb)"
              );
              break;
            case "clear sky":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/278927/pexels-photo-278927.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "few clouds":
            case "scattered clouds":
            case "broken clouds":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "overcast clouds":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "mist":
            case "smoke":
            case "haze":
            case "sand, dust whirls":
            case "fog":
            case "volcanic ash":
            case "dust":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "tornado":
            case "tropical storm":
            case "hurricane":
            case "violent storm":
            case "storm":
            case "severe gale":
            case "high wind, near gale":
            case "gale":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/167799/pexels-photo-167799.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "windy":
            case "calm":
            case "light breeze":
            case "gentle breeze":
            case "moderate breeze":
            case "fresh breeze":
            case "strong breeze":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/418682/pexels-photo-418682.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "hot":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/259474/pexels-photo-259474.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
            case "cold":
              $("body").css(
                "background-image",
                "url(https://images.pexels.com/photos/64705/frozen-berries-red-fruits-64705.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)"
              );
              break;
          }
        }

        getWeatherCondition(weatherType);
      })
      .fail(function() {
        // console.log("PROBLEM!");
      $( "#pageOne" ).hide();
      $( "#err" ).html("We cannot get the weather now, please try again later.");
      });
  });
});