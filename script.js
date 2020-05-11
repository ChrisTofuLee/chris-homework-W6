const searchSection = $("#previousSearchSection");



  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  
  today = dd + '/' + mm + '/' + yyyy;




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

function searchFunction(event) {
  event.preventDefault();
  const queryCity = $("#cityInput").val().trim();
  const weatherURL =
  "api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=166a433c57516f51dfab1f7edaed8413"
  console.log("click");
  console.log("input" + queryCity)
  
  function parseCurrentWeather(data) {
    console.log(data)
  iconCode = data.weather[0].icon
  const iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $(".cityDateIconArea").text(data.name + " (" + today + ") " )
    $("#weatherIcon").attr('src', iconURL)

    const tempConverter = data.main.temp - 273.15
    let tempToDisplay = tempConverter.toFixed(2);

    $(".temperatureArea").text("Temperature: " + (tempToDisplay) + " ℃")

    $(".humidityArea").text("Humidty: " + data.main.humidity + "%")
    const windConverter = data.wind.speed * 2.237
    const windToDisplay = windConverter.toFixed(1);
    $(".windSpeedArea").text("Wind Speed: " + windToDisplay + "MPH")

  }

  function errorFunction() {
      console.log("failed ajax")
  }
  
  $.ajax({
      url:weatherURL,
      method:"GET",
  }).then(parseCurrentWeather).catch(errorFunction)
 
}
