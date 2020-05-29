require('dotenv').config()
const axios = require('axios')
const {performance} = require('perf_hooks')

// URL formation
var cityID = '3436077' //Belgrano, Buenos Aires, AR
var apiKey = process.env.OW_API_KEY
var url = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=metric&appid=' + apiKey
//console.log(url) // URL Debuging

startTime = performance.now()
function executingAt() {
    return (performance.now() - startTime) / 1000
  }

/*
// Using Async-Await approach. It blocks the code when -await- occurs.
var getUrl = async function(url) {
    try {
        var response = await axios.get(url)
        var responseData = response.data
        var parsedJSON = JSON.parse(JSON.stringify(responseData))
        console.log('Temperature: ' + parsedJSON.main.feels_like + 'C')
        console.log('Humidity: ' + parsedJSON.main.humidity + '%')
        console.log(executingAt())
        //console.log(responseData)
    } catch (err) {
        console.log(err)
        console.log(executingAt())
    }
}

getUrl(url)
*/

// Using the Promise approach. Non-blocking code.
console.log(executingAt())

var getUrl = axios.get(url)

// Other stuff to do while the URL is being requested

getUrl.then(function (result) {
    var responseData = result.data
    var parsedJSON = JSON.parse(JSON.stringify(responseData))
    console.log('Temperature: ' + parsedJSON.main.feels_like + 'C');
    console.log('Humidity: ' + parsedJSON.main.humidity + '%');
    console.log(executingAt())
    })

.catch(function (err) {
    console.log('THERE WAS AN ERROR: ' + err)
    console.log(executingAt())
    })