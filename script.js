$(document).ready(function() {
  const searchSection = $("#previousSearchSection");

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  $("#searchBtn").on("click", searchFunction);


  function fiveDay() {
    const mockFive = {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [{
        dt: 1589317200,
        main: {
        temp: 282.79,
        feels_like: 279.19,
        temp_min: 281.05,
        temp_max: 282.79,
        pressure: 1017,
        sea_level: 1018,
        grnd_level: 1011,
        humidity: 65,
        temp_kf: 1.74
        },
        weather: [
        {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03n"
        }
        ],
        clouds: {
        all: 42
        },
        wind: {
        speed: 3.09,
        deg: 299
        },
        sys: {
        pod: "n"
        },
        dt_txt: "2020-05-12 21:00:00"
        },
        {
        dt: 1589328000,
        main: {
        temp: 280.17,
        feels_like: 274.85,
        temp_min: 278.99,
        temp_max: 280.17,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 1012,
        humidity: 66,
        temp_kf: 1.18
        },
        weather: [
        {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03n"
        }
        ],
        clouds: {
        all: 42
        },
        wind: {
        speed: 5.01,
        deg: 48
        },
        sys: {
        pod: "n"
        },
        dt_txt: "2020-05-13 00:00:00"
        },
        {
        dt: 1589338800,
        main: {
        temp: 279.02,
        feels_like: 274.67,
        temp_min: 278.65,
        temp_max: 279.02,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 1012,
        humidity: 66,
        temp_kf: 0.37
        },
        weather: [
        {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04n"
        }
        ],
        clouds: {
        all: 97
        },
        wind: {
        speed: 3.38,
        deg: 50
        },
        sys: {
        pod: "n"
        },
        dt_txt: "2020-05-13 03:00:00"
        },
        {
        dt: 1589349600,
        main: {
        temp: 278.08,
        feels_like: 273.13,
        temp_min: 278.03,
        temp_max: 278.08,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 1014,
        humidity: 69,
        temp_kf: 0.05
        },
        weather: [
        {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d"
        }
        ],
        clouds: {
        all: 74
        },
        wind: {
        speed: 4.18,
        deg: 39
        },
        sys: {
        pod: "d"
        },
        dt_txt: "2020-05-13 06:00:00"
        },
        {
        dt: 1589360400,
        main: {
        temp: 281.19,
        feels_like: 275.46,
        temp_min: 281.19,
        temp_max: 281.19,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 1014,
        humidity: 53,
        temp_kf: 0
        },
        weather: [
        {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d"
        }
        ],
        clouds: {
        all: 1
        },
        wind: {
        speed: 5.15,
        deg: 39
        },
        sys: {
        pod: "d"
        },
        dt_txt: "2020-05-13 09:00:00"
        },
        {
        dt: 1589371200,
        main: {
        temp: 283.34,
        feels_like: 277.84,
        temp_min: 283.34,
        temp_max: 283.34,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 1015,
        humidity: 46,
        temp_kf: 0
        },
        weather: [
        {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d"
        }
        ],
        clouds: {
        all: 26
        },
        wind: {
        speed: 4.83,
        deg: 42
        },
        sys: {
        pod: "d"
        },
        dt_txt: "2020-05-13 12:00:00"
        },
        {
        dt: 1589382000,
        main: {
        temp: 284.18,
        feels_like: 278.18,
        temp_min: 284.18,
        temp_max: 284.18,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 1014,
        humidity: 44,
        temp_kf: 0
        },
        weather: [
        {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d"
        }
        ],
        clouds: {
        all: 90
        },
        wind: {
        speed: 5.58,
        deg: 38
        },
        sys: {
        pod: "d"
        },
        dt_txt: "2020-05-13 15:00:00"
        }],
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
    const inputElement = $("#cityInput");
    const queryCity = inputElement.val().trim();
    const weatherURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      queryCity +
      "&appid=24aa678b0a0e5d95e08705ab2cbadb31";

      
    function parseForcast(data) {
      $(".fiveDateArea").html("")
      console.log(data)

      const list = data.list
      console.log(list[0].dt_txt)
      
      list.each(function(index) {
        const dateTime = index.dt_txt
        const splitter = dateTime.split(" ");
        const splitDate = splitter[0]
        const splitTime = splitter[1]
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;


        if(splitDate != today) {
          if(splitTime = "12:00:00") {

            const dateConversion = ""
            let dateDivide = splitDate.split('-');
            const dmyDate = dateDivide[2] + '/' + dateDivide[1] + '/' + dateDivide[0];


            const cardDiv = $("<div>").addClass("card text-white bg-info mb-3 mr-4").attr("style", "max-width: 14rem;")
            const dateDiv = $("<div>").addClass("card-header h5 fiveDateArea").text(dmyDate)
            const bodyDiv = $("<div>").addClass("card-body")
            
            iconCode = index.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            const iconDiv = $("<img>").addClass("card-text py-3 fiveIconArea").attr("src", iconURL);

            const tempConverter = index.main.temp - 273.15;
            let tempToDisplay = tempConverter.toFixed(2);
            const tempDiv = $("<p>").addClass("card-text fiveTempArea").text("Temp: " + tempToDisplay + " ℃");

            const humidity = index.main.humidity
            const humidityDiv = $("<p>").addClass("card-text fiveHumidArea").text("humidity: " + humidity + "%")
            $(".forecastArea").append(cardDiv)
            $(cardDiv).append(bodyDiv)
            $(bodyDiv).append(iconDiv, tempDiv, humidityDiv)
          }
        }


        
      })
      
    }
    parseForcast(mockFive)
  }
//$("#8 .task").val(localStorage.getItem("8"));
  function searchFunction(event) {
    event.preventDefault();
    fiveDay(event)

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
            const uvIndex = data.value

            
            if(uvIndex > 5.99) {
              $(".uvIndexArea").text("UV Index: ");
              const span = $("<span>").attr("class", "badge badge-danger").text(uvIndex)
              $(".uvIndexArea").append(span)
              console.log("high")
            }if (uvIndex > 5 && uvIndex < 6) {
              $(".uvIndexArea").text("UV Index: ");
              const span = $("<span>").attr("class", "badge badge-success").text(uvIndex)
              $(".uvIndexArea").append(span)
              console.log("mid")
            }if (uvIndex < 4.99) {
              $(".uvIndexArea").text("UV Index: ");
              const span = $("<span>").attr("class", "badge badge-warning").text(uvIndex)
              $(".uvIndexArea").append(span)
              console.log("low")
            }
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

  }
})
