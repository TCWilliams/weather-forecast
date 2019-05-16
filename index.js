const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();
dotenv.config();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())


const googleBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json?`
const googleApiKey = process.env.GOOGLE_API_KEY

// locations from coordinates
app.post('/api/location', async (req, res) => {
  try {
    const response = await axios.get(`${googleBaseUrl}latlng=${req.body.lat},${req.body.lng}&result_type=locality|political&key=${googleApiKey}`)
    console.log(response.data)
    res.send(response.data)
  } catch(e) {
    console.log(e)
    res.send('error getting location', e)
  }
});


const darkSkyBaseUrl = `https://api.darksky.net/forecast`
const darkSkyApiKey = process.env.DARK_SKY_API_KEY

app.post('/api/weather', async (req, res) => {
  const response = await axios.get(`${darkSkyBaseUrl}/${darkSkyApiKey}/${req.body.latitude},${req.body.longitude}?units=si`)
    
  res.send(response.data)
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
