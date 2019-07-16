const request = require('request');

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
    return {
      summary,
      temperature1: temperature
    };
  });
};

module.exports = getTemp;