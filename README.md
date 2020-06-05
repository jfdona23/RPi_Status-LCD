# Status LCD for Raspberry Pi

## Table of Contents
1. [About this project](#about)
2. [Libraries Used](#libraries-used)
3. [Notes](#notes)

## About this project
The idea of this project is to show some useful data within the well known [1602 LCD display](https://www.amazon.com/SunFounder-Serial-Module-Display-Arduino/dp/B019K5X53O) (16 chars x 2 lines) with an I2C interface. \
In addition, I use a DHT22 temperature and humidity sensor to keep track of the temperature and humidity inside the room. \
Finally, I keep track the city's temperature and humidity using the OpenWeatherMap API. \
Data shown in the LCD will include CPU/Memory/Disk info, plus weather info. Maybe I buy a 20x04 LCD display or a TFT display to show even more info.

I've chosen Node.JS due its asynchronism and the fact it has a pretty decent support for Raspberry. Other option was using Python with multi threading support, but I though it would add too much complexity to the project. \
Why do I want a-sync be present in this project? Well, due I need to perform a few tasks and all of them have different execution times, it would be nicer if they can run as much simultanously as possible to avoid I/O locks. Remember this script will run in a scheduled way while I use the Raspberry for any other tasks.

## Libraries Used
* **[Axios](https://github.com/axios/axios)**: Retrieves URLs asynchronously using promises. Also, It has only one direct dependency (follow-redirects) and two indirects (debug and ms).
* **[Dotenv](https://github.com/motdotla/dotenv)**: Library to retrieve secrets or parameters using *.env* files.
* **[Raspberrypi Liquid Crystal](https://www.npmjs.com/package/raspberrypi-liquid-crystal)**: Library to control I2C-LCD using a Raspberry Pi.
* **[Node DHT Sensor](https://www.npmjs.com/package/node-dht-sensor)**: Library to control DHTxx or AMxxxx sensors using a Raspberry Pi.
* **[Child Process](https://nodejs.org/api/child_process.html)**: Built-in library to spawn child processes and execute shell comands on the underlying OS.
* **[Util](https://nodejs.org/api/util.html)**: Built-in library with several useful utilities. I've used it to *promisify* functions.

## Notes
* Currently, I'm only displaying CPU/RAM/Disk info rather than weather data. That's because ~~I run this script using a *cron* job and~~ it's a little bit tricky to alternate between screens in a proper way. \
Hardware info needs to be retrieved every 60 seconds, while weather data needs to be retrieved every 300 seconds. I could create two *cron* jobs, one every 60s and another one every 300s but that will override the weather info (300s) as soon as the hardware info is shown (60s) and not showing weather data until the next weather job runs.