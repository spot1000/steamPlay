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
      let temp = results.map(r => r.data) //add a variable to just get the appids
      console.log(temp[0].response.games);
      let count = temp.map(count => count.response.game_count);
      console.log(count);
      let keyArr = temp.splice(count.indexOf(Math.min.apply(null, count)), 1)[0].response.games[0]
      console.log(keyArr)
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
