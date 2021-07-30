// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// timestamp API
app.get("/api/:date?", (req, res) => {
  const dateUrlParam = req.params.date;
  let dateToView;

  // check  urlparam is empty
  if (!dateUrlParam) {
    dateToView = new Date();
  } else if (dateUrlParam.match(/^\d+$/)) { // check url param is a number
    dateToView = new Date(Number(dateUrlParam));
  } else {
    dateToView = new Date(dateUrlParam);
  }

  if (dateToView == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = dateToView.getTime();
    const utc = dateToView.toUTCString();
    res.json({ unix: unix, utc: utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
