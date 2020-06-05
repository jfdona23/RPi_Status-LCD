const sensor = require("node-dht-sensor").promises

var sensorType = 22 //22 = DHT22 or 11 = DHT11
var sensorPin = 26


async function readDHT() {
    /*
    //Fake response for testing purposes
    sensor.initialize({
        test: {
        fake: {
            temperature: 21,
            humidity: 60
        }
        }
    });
    */
   
    var response = await sensor.read(sensorType, sensorPin)
    return{
        temp: response.temperature.toFixed(1),
        hum: response.humidity.toFixed(0)
    }
}

module.exports.readDHT = readDHT