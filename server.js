// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function (request, response) {
  var unix = Number(request.params.time);
  var time;
  if(unix){
  time = (new Date(request.params.time*1000)).toDateString(); 
  } else {
    time = (new Date(request.params.time)).toDateString();
    unix = (new Date(request.params.time)).getTime()/1000;
  }
  if(!unix || time==="Invalid Date") {
    time = null;
    unix = null;
  }
   
  response.send({unix: unix, natural: time});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
