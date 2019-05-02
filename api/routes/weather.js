var express = require('express');
var router = express.Router();
const axios = require('axios');

const baseUrl = `https://api.darksky.net/forecast`
const secret = 'SECRET'

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

