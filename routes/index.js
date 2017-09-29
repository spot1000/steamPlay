var express = require('express');
var router = express.Router();
var axios = require('axios');

let apiKey = "DDDD16E842E75C868F017A3A541C69D4";

console.log(apiKey);

axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + apiKey + '&steamid=76561198010164774&format=json')
  .then(response => {

    router.get('/', function(req, res, next) {

      res.send(response.data);
    });

    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  });

/* GET home page. */


module.exports = router;
