$(document).ready(function () {
  const searchSection = $("#previousSearchSection");

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  $("#searchBtn").on("click", searchFunction);

  //call and function for previous searches
  $(".historySearch").on("click", "li", function () {
    
    console.log(event.path[0].innerHTML)
    const inputElement = event.path[0].innerHTML
  
    const weatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputElement +
      "&appid=24aa678b0a0e5d95e08705ab2cbadb31";
      function parseHistoryWeather(data) {
        //   console.log(data);
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
      $.ajax({
        url: weatherURL,
        method: "GET",
      })
        .then(parseHistoryWeather)
      fiveDay(inputElement)
      getUvForSearchedCity(data.coord.lat, data.coord.lon);
  });


  function fiveDay(searchedCity) {
    const inputElement = $("#cityInput");
    const queryCity = inputElement.val().trim();
    const forecastURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      searchedCity +
      "&appid=24aa678b0a0e5d95e08705ab2cbadb31";
    
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(parseForecast);

    function parseForecast(data) {
      $(".forecastArea").html("");

      const list = data.list;
      let todayNew = new Date();
      let dd = String(todayNew.getDate()).padStart(2, "0");
      let mm = String(todayNew.getMonth() + 1).padStart(2, "0");
      let yyyy = todayNew.getFullYear();

      todayNew = yyyy + "-" + mm + "-" + dd;

      list.forEach((index) => {
        const dateTime = index.dt_txt;
        const splitter = dateTime.split(" ");
        const splitDate = splitter[0];
        const splitTime = splitter[1];

        if (splitDate != todayNew && splitTime === "12:00:00") {
            const dateConversion = "";
            let dateDivide = splitDate.split("-");
            const dmyDate =
              dateDivide[2] + "/" + dateDivide[1] + "/" + dateDivide[0];
            console.log(dmyDate)
            const cardDiv = $("<div>")
              .addClass("card text-white bg-info mb-3 mr-4")
              .attr("style", "max-width: 15rem;");
            const dateDiv = $("<div>")
              .addClass("card-header font-weight-bold")
              .text(dmyDate);
            const bodyDiv = $("<div>").addClass("card-body");

            iconCode = index.weather[0].icon;
            const iconURL =
              "http://openweathermap.org/img/w/" + iconCode + ".png";
            const iconDiv = $("<img>")
              .addClass("card-text py-2 fiveIconArea")
              .attr("src", iconURL);

            const tempConverter = index.main.temp - 273.15;
            let tempToDisplay = tempConverter.toFixed(2);
            const tempDiv = $("<p>")
              .addClass("card-text fiveTempArea")
              .text("Temp: " + tempToDisplay + " ℃");

            const humidity = index.main.humidity;
            const humidityDiv = $("<p>")
              .addClass("card-text fiveHumidArea")
              .text("Humidity: " + humidity + "%");
            $(".forecastArea").append(cardDiv);
            $(cardDiv).append(dateDiv);
            $(cardDiv).append(bodyDiv);
            $(bodyDiv).append(iconDiv, tempDiv, humidityDiv);
          
        }
        console.log("test" + splitDate);
      });
      // $.each(list, function(index) {
    }
  }
  const localStorageArray = [];
  //$("#8 .task").val(localStorage.getItem("8"));

  function searchFunction(event) {
    event.preventDefault();


    //create genericAPIFetch function to create the separate apis

    const inputElement = $("#cityInput");
    const queryCity = inputElement.val().trim();
    const weatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      queryCity +
      "&appid=24aa678b0a0e5d95e08705ab2cbadb31";

      
      const searchedCity = queryCity
      fiveDay(queryCity);

    localStorageArray.unshift(queryCity);
    localStorage.setItem("cityStorage", localStorageArray);
    // localStorage.setItem(city, queryCity);
    function parseCurrentWeather(data) {
      //   console.log(data);
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

    

    function currentWeatherError() {
    
      alert("Please enter valid city, town, or country")
    }

    $.ajax({
      url: weatherURL,
      method: "GET",
    })
      .then(parseCurrentWeather)
      .catch(currentWeatherError);
    searchHistory();
    function searchHistory() {
      const previousSearches = localStorage.getItem("cityStorage");
      searchesArray = previousSearches.split(",");
      let count = 5;
      if (searchesArray.length < 5) {
        count = searchesArray.length;
      }
      $(".historySearch").empty();

      for (let i = 0; i < count; i++) {
        const searchList = $("<li>")
          .addClass("list-group-item")
          .text(searchesArray[i]);

        $(".historySearch").append(searchList);
      } //change the searchlink append to running the function
    }
  }
  function getUvForSearchedCity(latitude, longitude) {
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/uvi?&appid=24aa678b0a0e5d95e08705ab2cbadb31&lat=" +
        latitude +
        "&lon=" +
        longitude,
      datatype: "json",
      success: function (data) {
        console.log(data.value);
        const uvIndex = data.value;

        if (uvIndex > 5.99) {
          $(".uvIndexArea").text("UV Index: ");
          const span = $("<span>")
            .attr("class", "badge badge-danger")
            .text(uvIndex);
          $(".uvIndexArea").append(span);
          console.log("high");
        }
        if (uvIndex > 5 && uvIndex < 6) {
          $(".uvIndexArea").text("UV Index: ");
          const span = $("<span>")
            .attr("class", "badge badge-success")
            .text(uvIndex);
          $(".uvIndexArea").append(span);
          console.log("mid");
        }
        if (uvIndex < 4.99) {
          $(".uvIndexArea").text("UV Index: ");
          const span = $("<span>")
            .attr("class", "badge badge-warning")
            .text(uvIndex);
          $(".uvIndexArea").append(span);
          console.log("low");
        }
      },
      error: function (error) {},
    });
  }
});
// edit code to allow previously searched destinations appear on the page even after refreshing