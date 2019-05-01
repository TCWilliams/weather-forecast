var express = require('express');
var router = express.Router();
const axios = require('axios');

const baseUrl = `https://api.darksky.net/forecast`
const secret = '90c63c102338dddcbf0c94ca3bbd1da4'

router.post('/', function(req, res) {
  axios.get(`${baseUrl}/${secret}/${req.body.latitude},${req.body.longitude}?units=si`)
    .then(response => {
      res.send(response.data)
    })
    .catch(err => {
      console.log(err)
      res.send({err});
    });
});

module.exports = router;

