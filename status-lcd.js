const { getWeather } = require('./features/openweather-axios.js')
const { readDHT } = require('./features/dht22.js')
const { cmdOutput } = require('./features/cmd.js')
const LCD = require('raspberrypi-liquid-crystal');


const lcd = new LCD( 1, 0x27, 16, 2 );

lcd.beginSync()
lcd.clearSync()

getWeather()
    .then(data => {
        lcd.printLineSync(0, `O: T:${data.temp}c H:${data.hum}`)
        //console.log(data.temp)
        //console.log(data.hum)
    })
    .catch(err => {
        console.log(err)
    })

readDHT()
    .then(data => {
        lcd.printLineSync(1, `I: T:${data.temp}c H:${data.hum}`)
        //console.log(data.temp)
        //console.log(data.hum)
    }).catch(err => {
        console.log(err)
    })

cmdOutput()
    .then(data => {
        console.log(data.cpuTemp)
        console.log(data.freeMem)
        console.log(data.usedDisk)
    })
    .catch(err => {
        console.log(err)
    })