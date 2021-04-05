'use strict';

const express = require('express'); 
require('dotenv').config(); 

const cors = require('cors');
const server = express();
const PORT = process.env.PORT || 5000;
const superagent = require('superagent');

server.use(cors());

server.get('/', rr);
server.get('/location',locatine);
server.get('/weather',weather);
server.get('/parks',park);

server.get('*',all);
function  rr(req,res){
    res.send('you server is working')
}


function Location(cityName,geoData) {

    this.search_query = cityName ;
    this.formatted_query = geoData[0].display_name;
     this.latitude = geoData[0].lat;
     this.longitude = geoData[0].lon;
 }


function locatine(req,res){
    let cityName = req.query.city;
    let key = process.env.LOCATION_KEY;
    let LocURL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`;
    superagent.get(LocURL) 
    .then(geoData => {
        let gData = geoData.body;
        const locationData = new Location(cityName, gData);
        res.send(locationData);
    })

}


function Weather(gData) {

    this.forecast = gData.weather.description;
    this.time = gData.valid_date;
}


function weather(req,res){
    let cityName = req.query.search_query;
    console.log(cityName)
    let key = process.env.WEATHER_KEY;
    let LocURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}`;

    superagent.get(LocURL) 
     .then(geoData => {
        let gData = geoData.body;
        // console.log('ddddddddddddddddddddd',gData)


        let data=[];
            gData.data.map(el=>
            {
             data.push(new Weather (el));
            })
        res.send(data);
    })
}



//     let LocURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}`;

function park(req,res){
    let cityName = req.query.search_query;
    console.log(cityName)
    let key = process.env.PARK_KEY;
    let LocURL = `https://developer.nps.gov/api/v1/parks?q=${cityName}&api_key=${key}`;
    // console.log('ddddddddddddddddddddd',req.query)
    superagent.get(LocURL) 
     .then(geoData => {
        let gData = geoData.body;
       


        let dataPark=[];
            gData.data.map(el=>
            {
                dataPark.push(new Park (el));
            })
        res.send(dataPark);
    })
}
function Park(gData) {

    this.name = gData.name;
    this.address = gData.address;
    this.fee=gData.fee;
    this.description=gData.description;
    this.url=gData.url;
}





function all(req,res){
    let err = {
        status: 500,
        responseText: "Sorry, something went wrong"
    }
    res.status(500).send(err);
}

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
