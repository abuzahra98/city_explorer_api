'use strict';

const express = require('express'); 
require('dotenv').config(); 

const cors = require('cors');
const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());

server.get('/',(req,res)=>{
    res.send('you server is working')
})


server.get('/location',(req,res)=>{
    
    let Data = require('./data/location.json');
    let locationData = new Location (Data);
    res.send(locationData);
})

function Location(locData) {

   
    this.latitude = locData[0].lat;
    this.longitude = locData[0].lon;
    this.cityName = locData[0].display_name;
}

server.get('/weather',(req,res)=>{
    let data=[];
    let Data = require('./data/weather.json');
 Data.data.map(el=>
    {
     data.push(new Weather (el));
    })
    
    res.send(data);
})


function Weather(locData) {

console.log(locData)
    this.valid_date = locData.valid_date;
    this.description = locData.weather.description;
}




server.get('*',(req,res)=>{
    
    let err = {
        status: 500,
        responseText: "Sorry, something went wrong"
    }
    res.status(500).send(err);
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})