require('dotenv').config()
var http = require('https');

/*
// Performace measurement staff
const {performance} = require('perf_hooks')
startTime = performance.now()
function executingAt() {
    return (performance.now() - startTime) / 1000
  }
console.log(executingAt())
*/

// URL
var cityID = "3436077"; //Belgrano, Buenos Aires, AR
var apiKey = process.env.OW_API_KEY;
var options = {
  host: 'api.openweathermap.org',
  path: '/data/2.5/weather?id=' + cityID + '&units=metric&appid=' + apiKey
};

callback = function(response) {
  var str = '';

  // A chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  // The whole response has been received, so we just print it out here
  response.on('end', function () {
    parsedJSON = JSON.parse(str);
    // Handle API or JSON errors
    if (parsedJSON.main) {
      console.log('Temperature: ' + parsedJSON.main.feels_like + 'C');
      console.log('Humidity: ' + parsedJSON.main.humidity + '%');
    } else {
        console.log(str);
    }
    
  });
}

var req = http.request(options, callback)

// Handle request errors
req.on('error', function(err) {
  console.log(err);
});

req.end()