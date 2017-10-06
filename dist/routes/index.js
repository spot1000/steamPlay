let express = require('express');
let router = express.Router();
let axios = require('axios');

let apiKey = "DDDD16E842E75C868F017A3A541C69D4";
let httpAddress = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + apiKey;

let returnarray = [];

console.log(apiKey);
router.get('/:args', (req, res, next) => {
  let mypromises = [];
  let array = req.params.args.split('&');
  console.log(array);
  array.forEach(x => {
    console.log(httpAddress + "&steamid=" + x + "&format=json");
    mypromises.push(axios.get(httpAddress + "&steamid=" + x + "&format=json"));
  });
  console.log(mypromises);
  axios.all(mypromises).then(axios.spread((...args) => {
    console.log(args.data);
  }));

  // axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + apiKey + '&steamid=76561198010164774&format=json')
  //   .then(response => {
  //
  //     res.send(response.data);
  //   });
  //
  //   console.log(response.data); // ex.: { user: 'Your User'}
  //   console.log(response.status); // ex.: 200
});

/* GET home page. */

module.exports = router;