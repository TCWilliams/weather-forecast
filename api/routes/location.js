var express = require('express');
var router = express.Router();
const axios = require('axios');

const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?`


const secret = 'AIzaSyCJeEtjRLiARW3H4umsp1aLkM3VObA6p8k'

// location from string
router.post('/', function(req, res) {
  console.log('Location', req.body)
  console.log(`${baseUrl}&key=${secret}`)
  axios.get(`${baseUrl}address=${req.body.location}&key=${secret}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(err => {
      console.log(err.response.data)
      res.send(err.response.data);
    });
});

// locations from coordinates
router.post('/reverse/', function(req, res) {
  console.log('Location', req.body)
  console.log(`${baseUrl}&key=${secret}`)
  axios.get(`${baseUrl}latlng=${req.body.lat},${req.body.lng}&key=${secret}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(err => {
      console.log(err.response.data)
      res.send(err.response.data);
    });
});


module.exports = router;

