const express = require('express');
// const axios = require('axios');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db.js');
// const config = require('../config.js');
const api = require('./api.js');
// require('dotenv').config();

const app = express();
// const port = PORT || 3001;
const port = process.env.PORT || 3001;
console.log({ port });
// const port = 3001;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/public'));
app.use(bodyParser.json());

// app.get('/movies/:year', (req, res) => {
//   db.fetchWinners(req.params.year)
//     .then((data) => res.send(data))
//     .catch((err) => res.status(500).send(err));
// });

app.get('/movies/:year', (req, res) => {
  db.fetchWinners(req.params.year, (err, data) => {
    if (err) {
      console.log('err:', err);
      return res.status(500).send(err);
    }
    // console.log('data:', data);
    res.send(data);
  });
});

app.get('/poster/:info', (req, res) => {
  api.getPoster(req.params.info.split('+'), (err, data) => {
    if (err) {
      console.log('err:', err);
      return res.status(500).send(err);
    }
    res.send(data);
  });
});

app.get('/info/:title', (req, res) => {
  console.log('req.params.title:', req.params.title);
  // fetch from the other API
  api.getSummary(req.params.title, (err, info) => {
    if (err) {
      console.log('err:', err);
      return res.status(500).send(err);
    }
    console.log('info from API', info);
    info.nytimes = false;
    // justMainCats.review = info;
    res.send(info);
  })
});

// app.get('/review/:title', (req, res) => {
//   console.log('req.params.title:', req.params.title);
//   res.sendStatus(200);
// });

app.listen(port, () => console.log(`Server is listening at: ${port}`));

// db.findYear('2007 (80th)');


// let config = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
// };

// let data = {
//   grant_type: 'password',
//   username: 'fchopin2',
//   password: 'Hitchcock2021!',
//   clientId: 'fchopin2'
// };

// axios.post('https://api.letterboxd.com/api/v0/auth/token', data, config)
//   .then((msg) => {
//     console.log('msg:', msg);
//   })
//   .catch((err) => {
//     console.log('err.response.data:', err.response.data);
//   });


// process.env.PORT
// PORT = 8080
// NYTIMESTOKEN = yEpXbjaRANSdVXSvBFGEsk3gWHHPNtxm
// RAPIDAPIKEY = '0631013508mshb7db09988561e92p1221c9jsn0866d669fabd';
// OMDBAPIKEY = 'ff4c4415';
// IMDBID = 'tt3896198';

// sample: heroku config:set MONGODB_URI="mongodb+srv://yourUsername:yourPassword@yourClusterName.n9z04.mongodb.net/sample_mflix?retryWrites=true&w=majority"

// heroku config:set MONGODB_URI="mongodb+srv://bob-kelly:aRsyHDWPjc0z8RQW@cluster0.euc8x.mongodb.net/mvp"


// mongo "mongodb+srv://cluster0.euc8x.mongodb.net/mvp" --username bob-kelly
// atlas password: aRsyHDWPjc0z8RQW
// db: mvp, collections: oscars


// heroku config:set PORT=8080
// heroku config:set NYTIMESTOKEN=yEpXbjaRANSdVXSvBFGEsk3gWHHPNtxm
// heroku config:set RAPIDAPIKEY=0631013508mshb7db09988561e92p1221c9jsn0866d669fabd
// heroku config:set OMDBAPIKEY=ff4c4415
// heroku config:set IMDBID=tt3896198
// heroku config:set MONGODB_URI="mongodb+srv://bob-kelly:aRsyHDWPjc0z8RQW@cluster0.euc8x.mongodb.net/mvp"

// /Users/robertkelly/dropbox/_repos/_immersive/_mvp/_resources/oscars.json

// mongoexport --collection=oscars --db=mvp --out=/Users/robertkelly/dropbox/_repos/_immersive/_mvp/_resources/oscars.json
// mongoimport "mongodb+srv://bob-kelly:aRsyHDWPjc0z8RQW@cluster0.euc8x.mongodb.net/mvp" /Users/robertkelly/dropbox/_repos/_immersive/_mvp/_resources/oscars.json

// mongoimport "mongodb+srv://bob-kelly:aRsyHDWPjc0z8RQW@cluster0.euc8x.mongodb.net/mvp" --db=mvp --collection=oscars --file=/Users/robertkelly/dropbox/_repos/_immersive/_mvp/_resources/oscars.json