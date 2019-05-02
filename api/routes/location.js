var express = require('express');
var router = express.Router();
const axios = require('axios');

const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?`
const secret = 'SECRET'



// locations from coordinates
router.post('/', function(req, res) {
  console.log('Location', req.body)
  console.log(`${baseUrl}&key=${secret}`)
  axios.get(`${baseUrl}latlng=${req.body.lat},${req.body.lng}&result_type=locality|political&key=${secret}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(err => {
      console.log(err.response.data)
      res.send(err.response.data);
    });
});


module.exports = router;

