let express = require('express');
let router = express.Router();
let axios = require('axios');

require('dotenv').config()

let apiKey = process.env.APIKEY;
console.log(process.env.APIKEY)
let httpAddress = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + apiKey

let returnarray = []

router.get('/:args', (req, res, next) => {
  let mypromises = [];
  let array = req.params.args.split('&');
  console.log(array);
  array.forEach((x) => {
    console.log(httpAddress + "&steamid=" + x + "&format=json")
    mypromises.push(axios.get(httpAddress + "&steamid=" + x + "&format=json"))
  })
  console.log(mypromises)
  axios.all([axios.get(httpAddress + "&steamid=" + array[0] + "&format=json"), axios.get(httpAddress + "&steamid=" + array[1] + "&format=json")])
    .then( (results) => {
      let temp = results.map(r => r.data)
      console.log(temp);
      let count = temp.map(count => count.response.game_count)
      console.log(count.indexOf(Math.min(count)))
      res.send(count.indexOf(Math.min(count)))

    })





  // axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + apiKey + '&steamid=76561198010164774&format=json')
  //   .then((response) => {
  //     console.log(response.data); // ex.: { user: 'Your User'}
  //
  //
  //     res.send(response.data);
  //   });
  });

/* GET home page. */


module.exports = router;
