const path = require('path');
const express = require('express');
const hbs =  require('hbs');
const request = require('request');
// const temperature = require('../utils/temp.js');
// const getTemp = require('../utils/getTemp.js');

// configuring templates and static assets
const staticAssets = path.join(__dirname, '../public');
const templates = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partials);

const appServer = express();

const port = process.env.PORT || 3000;

// type of template engine
appServer.set('view engine', 'hbs');

// for views directory
appServer.set('views', templates);

// for serving static assets
appServer.use(express.static(staticAssets));

// root
appServer.get('', (req, res) => {
  res.render('index', {
    title: 'My Weather App',
    doneBy: 'Sai Velamuri',
    name: 'Sai Krishna Sarath Velamuri'
  }); // it will look into views folder by defalut
})

// about
appServer.get('/about', (req, res) => {
  res.render('about', {
    title: 'Sai krishna',
    name: 'Sai Krishna Sarath Velamuri'
  });
});

// help
appServer.get('/help', (req, res) => {
  res.render('help', {
    foo: 'bar',
    name: 'Sai Krishna Sarath Velamuri'
  });
});

// weather
appServer.get('/weather', async (req, res) => {
  const {
    address = ''
  } = req.query;

  if (!address) {
    return res.send({
      error: "address not provided"
    });
  }

  const myTemp = (address) => {
    const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hhcmF0aHYiLCJhIjoiY2p5MG9qNHZuMDVhczNnbGVyYjd0NXc4ZCJ9.wIjsQ618fiSrZt7RHUVaMA`;
    request.get(
      {
        url: locationURL,
        json: true
      },
      (error, response) => {
        if (error) {
          console.log(error);
          return;
        }
        else if (response.body.code >= 300) {
          console.log(response.body.error);
          return;
        }
        const {
          body: {
            features = [],
          } = {},
        } = response;
        if (features.length === 0) return;
        const {
          center = ['', ''],
        } = features[0];
        let summary = '';
        let temperature1 = '';
        const getTemp = (longitude, latitude) => {
          const reqURL = `https://api.darksky.net/forecast/0c7a0910aa6d652830dc4958e2b757cc/${latitude},${longitude}`;
          request.get(
            {
              url: reqURL,
              json: true
            },
            (error, response = {}) => {
              if (error) {
                console.log(error);
                return;
              }
              const {
                body: {
                  currently: {
                    temperature = '',
                  } = {},
                  daily: {
                    data = [],
                  } = {},
                } = {},
              } = response;
              const {
                summary = ''
              } = data[0];
              console.log('before sending');
              res.send({
                address,
                summary,
                temperature1: temperature
              });
            });
        };
        getTemp(center[0], center[1]);
      });
  };

  myTemp(address);
});

appServer.get('/products', (req, res) => {
  const {
    search = ''
  } = req.query;
  if (!search) {
    return res.send({
      error: 'No Search term provided',
    });
  }
  res.send({
    products: []
  });
});

// 404 default
appServer.get('*',(req, res) => {
  res.render('unauth404');
});

// server
appServer.listen(port, () => {
  console.log(`server is up on port ${port}!!`);
});
