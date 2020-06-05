require('dotenv').config({path: './features/.env'})
const axios = require('axios')

// URL formation
var cityID = '3436077' //Belgrano, Buenos Aires, AR
var apiKey = process.env.OW_API_KEY
var url = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=metric&appid=' + apiKey
//console.log(url) // URL Debuging


// Async-Await approach
async function getUrl() {
    var response = await axios.get(url)
    var parsedJSON = JSON.parse(JSON.stringify(response.data))

    return {
        temp: parsedJSON.main.feels_like,
        hum: parsedJSON.main.humidity
    }
    /*
    // Promises approach
    axios.get(url)
        .then(function (result) {
            var responseData = result.data
            var parsedJSON = JSON.parse(JSON.stringify(responseData))
            console.log('Temperature: ' + parsedJSON.main.feels_like + 'C');
            console.log('Humidity: ' + parsedJSON.main.humidity + '%');
            return
        })
        .catch(function (err) {
            console.log('THERE WAS AN ERROR: ' + err)
            return err
        })
    */
}


module.exports.getWeather = getUrl