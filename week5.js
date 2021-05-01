// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function () {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function (event) {

    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location and number of days
    let locationInput = document.querySelector(`#location`)
    let daysInput = document.querySelector(`#days`)

    // - Get the user-entered location and number of days from the element's value
    let location = locationInput.value
    let days = daysInput.value

    // - Check to see if the user entered anything; if so:
    if (location.length > 0) {

      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=9e70ae09856d4136a56151209213004&q=${location}&days=${days}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = json.location
      let currentWeather = json.current
      let dailyForecast = json.forecast

      // Store a reference to the "current" element
      let currentElement = document.querySelector(`.current`)

      // Fill the current element with the location and current weather conditions
      currentElement.innerHTML = `
       <div class="text-center space-y-8">
         <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
         <div class="font-bold">
           <img src="https://${currentWeather.condition.icon}" class="inline-block">
           <span class="temperature">${currentWeather.temp_c}</span>°C 
           and
           <span class="conditions">${currentWeather.condition.text}</span>
         </div>
       </div>    
     `
      // Store a reference to the "forecast" element
      let forecastElement = document.querySelector(`.forecast`)

      // Display x-Day forcast based on user input
      forecastElement.innerHTML = `<div class="text-center font-bold text-3xl">${days}-Day Forecast</div>`

      // Construct a for loop to show the number of days' forcast based on user input
      for (let i = 0; i < days; i++) {

        // Fill the forecast element with the forecast weather conditions (icon, date, high, low, and condition)
        forecastElement.innerHTML += `<div>
          <img src="https://${dailyForecast.forecastday[i].day.condition.icon}" class="mx-auto">
          <h1 class="text-center text-2xl text-bold text-gray-500">${dailyForecast.forecastday[i].date}</h1>
          <h2 class="text-center text-xl">High ${dailyForecast.forecastday[i].day.maxtemp_c}°C – Low ${dailyForecast.forecastday[i].day.mintemp_c}°C</h2>
          <p class="text-center text-gray-500">${dailyForecast.forecastday[i].day.condition.text}</h1>
        </div>`
      }
    }
  })
})





