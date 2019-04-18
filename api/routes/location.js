var express = require('express');
var router = express.Router();
const axios = require('axios');

const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?`


const secret = 'AIzaSyCJeEtjRLiARW3H4umsp1aLkM3VObA6p8k'

router.post('/', function(req, res) {
  console.log('Location', req.body)
  console.log(`${baseUrl}&key=${secret}`)
  axios.get(`${baseUrl}address=${req.body.town}&key=${secret}`)
    .then(response => {
      console.log(response)
      res.send(response.data)
    })
    .catch(err => {
      console.log(error)
      res.send({error});
    });
});

module.exports = router;

