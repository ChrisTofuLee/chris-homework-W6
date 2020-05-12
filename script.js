$(document).ready(function() {
  const searchSection = $("#previousSearchSection");

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  $("#searchBtn").on("click", searchFunction);

  const mockData = {
    coord: {
      lon: -0.13,
      lat: 51.51,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 285.99,
      feels_like: 285.43,
      temp_min: 285.37,
      temp_max: 286.48,
      pressure: 999,
      humidity: 77,
    },
    wind: {
      speed: 0.45,
      deg: 243,
      gust: 2.24,
    },
    clouds: {
      all: 100,
    },
    dt: 1588183472,
    sys: {
      type: 3,
      id: 2019646,
      country: "GB",
      sunrise: 1588134919,
      sunset: 1588188006,
    },
    timezone: 3600,
    id: 2643743,
    name: "London",
    cod: 200,
  };
//$("#8 .task").val(localStorage.getItem("8"));
  function searchFunction(event) {
    event.preventDefault();

  //create genericAPIFetch function to create the seperate apis

    const inputElement = $("#cityInput");
    const queryCity = inputElement.val().trim();
    const weatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      queryCity +
      "&appid=24aa678b0a0e5d95e08705ab2cbadb31";

      // localStorage.setItem(city, queryCity);
    function parseCurrentWeather(data) {
      console.log(data);
      iconCode = data.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

      $(".cityDateIconArea").text(data.name + " (" + today + ") ");
      $("#weatherIcon").attr("src", iconURL);
    

      const tempConverter = data.main.temp - 273.15;
      let tempToDisplay = tempConverter.toFixed(2);

      $(".temperatureArea").text("Temperature: " + tempToDisplay + " ℃");

      $(".humidityArea").text("Humidty: " + data.main.humidity + "%");
      const windConverter = data.wind.speed * 2.237;
      const windToDisplay = windConverter.toFixed(1);
      $(".windSpeedArea").text("Wind Speed: " + windToDisplay + "MPH");

      getUvForSearchedCity(data.coord.lat, data.coord.lon);
    }
    function getUvForSearchedCity(latitude, longitude) {
        $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/uvi?&appid=24aa678b0a0e5d95e08705ab2cbadb31&lat=" + latitude+ "&lon=" + longitude,
          datatype: "json",
          success: function(data) {
            console.log(data.value);
          },
          error: function(error) {

          }
        })
    }

    function currentWeatherError() {
      console.log("failed ajax");
    }

    $.ajax({
      url: weatherURL,
      method: "GET",
    })
      .then(parseCurrentWeather)
      .catch(currentWeatherError);

    const mockFive = {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [
        {
          dt: 1589220000,
          main: {
            temp: 283.17,
            feels_like: 277.92,
            temp_min: 282.16,
            temp_max: 283.17,
            pressure: 1025,
            sea_level: 1025,
            grnd_level: 1018,
            humidity: 43,
            temp_kf: 1.01,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04d",
            },
          ],
          clouds: {
            all: 82,
          },
          wind: {
            speed: 4.28,
            deg: 27,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2020-05-11 18:00:00",
        },
      ],
      city: {
        id: 2643123,
        name: "Manchester",
        coord: {
          lat: 53.4809,
          lon: -2.2374,
        },
        country: "GB",
        population: 395515,
        timezone: 3600,
        sunrise: 1589170480,
        sunset: 1589226963,
      },
    };

    function parseForcast(data) {
      //before targeting the data, make if statement to make sure same day is not displayed and that it only displays the mid day of that day
      console.log(mockFive);
      iconCode = mockFive.list[1].weather[0].icon;
      const iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";

      //     const dateConversion =""
  //     var parts = mdyDate.split('/');
  // var dmyDate = parts[1] + '/' + parts[0] + '/' + parts[2];
      $(".cityDateIconArea").text(mockFive.name + " (" + today + ") ");
      $("#weatherIcon").attr("src", iconURL);

      const tempConverter = mockFive.main.temp - 273.15;
      let tempToDisplay = tempConverter.toFixed(2);

      $(".temperatureArea").text("Temperature: " + tempToDisplay + " ℃");

      $(".humidityArea").text("Humidty: " + mockFive.main.humidity + "%");
      const windConverter = mockFive.wind.speed * 2.237;
      const windToDisplay = windConverter.toFixed(1);
      $(".windSpeedArea").text("Wind Speed: " + windToDisplay + "MPH");
    }

  }
})
