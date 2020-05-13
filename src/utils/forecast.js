const request = require("request");

const forecast = (latitude, longitude, callback) => {
  url = `http://api.weatherstack.com/current?access_key=c257970948f53dbac655c65d0ae76734&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather API", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temprature: body.current.temperature,
        feels: body.current.feelslike,
        humidity: body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
