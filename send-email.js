'use strict';

var express = require('express');
var app = express();

var issueNumber = Math.round((Number) (Math.random() * 100000)); 
const send = require('gmail-send')({
  user: 'rajs02763@gmail.com',
  pass: 'Password@123',
  to:   'siddharthh.gaurr@gmail.com',
  subject: '#' + issueNumber + ' Fight related issue',
});


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const fs = require('fs');

let rawData = fs.readFileSync('db.json');

let flightData = JSON.parse(rawData);
let low = 0;
let high = flightData.length;
let thisFlight = flightData[0];
let hotelRender = "";

let sendData;
if(thisFlight["flight status"] == 'cancelled') {
  let hotelData = fs.readFileSync('hotels_data.json');
  hotelRender = "Nearby Hotels";
  sendData = JSON.parse(hotelData);
  send({
    html:'Dear customer, <br> Your flight has been cancelled due to unanticipated events. <br> We regret the inconvinence caused to you. In the meantime we request you to look at the <a href="http://localhost:8080"> available hotels </a> to extend incase you plan to extend your stay.',  
    }, (error, result, fullResult) => {
    if (error) console.error(error);
      console.log(result);  
  });
}  else if (thisFlight["flight status"] == 'delayed') {
  let thingsToDo = fs.readFileSync('things_to_do.json');
  hotelRender = "Things To Do";
  sendData = JSON.parse(thingsToDo);
  send({
    html:'Dear customer, <br> Your flight has been delayed due to unanticipated events. <br> We regret the inconvinence caused to you. In the meantime we request you to look at the <a href="http://localhost:8080"> available hotels </a> to extend incase you plan to extend your stay.',  
    }, (error, result, fullResult) => {
    if (error) console.error(error);
      console.log(result);  
  });
}
console.log(hotelRender);
if(sendData != null) {
  app.get('/', function(req, res) {
    res.render("index.ejs", {sendData: sendData, hotelRender: hotelRender});
  });
}



function random(low, high) {
  let result = Math.round(Math.random() * (high - low) + low);
  if (result == 3) {
    return 2;
  } 
  return result;
}

app.listen(8080);
console.log('8080 is the magic port');