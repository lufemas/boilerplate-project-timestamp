// index.js
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

// The timestamp endpoint... 
app.get("/api/:dateString?", function(req, res) {
  // The date string provided as query param
  const dateString = req.params.dateString;
  console.log('dateString: ', !!dateString);
  console.log('req.params.dateString: ', req.params.dateString);
  console.log('req.params.dateString: ', !!req.params.dateString);

  let date = new Date();
  if (!!dateString) {
    // const isYyyymmdd = /^\d{4}[-]\d{2}[-]\d{2}$/.test(dateString);
    const isUnix = /^\d{13}$/.test(dateString);
    date = isUnix ? new Date(parseInt(dateString)) : new Date(dateString);
    if (isNaN(date.getTime())) return res.json({ error: "Invalid Date" });
  }

  return res.json(
    {
      utc: date.toUTCString(),
      unix: date.getTime()
    });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
