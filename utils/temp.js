const request = require('request');
const getTemp = require('./getTemp.js');
// const yargs = require('yargs');

// const address = yargs.argv.address;

// const address = process.argv[2];

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
        center = ['',''],
      } = features[0];
      let summary = '';
      let temperature1 = '';
      getTemp(center[0], center[1]);
    });
};

module.exports = myTemp;





// yargs.parse();