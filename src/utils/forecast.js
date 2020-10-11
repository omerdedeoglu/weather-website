const request = require('request')

const forecast = (latitude, longitude, callback) => {
 const url = 'http://api.weatherstack.com/current?access_key=0b4e17ed4046c0bd944b5d257afcc160&query=' + latitude + ',' + longitude
 request({ url, json: true }, (error, { body }) => {
  if (error) {
   callback('Unable to connect to weather service!', undefined)
  }
  else if (body.error) {
   callback('Unable to find location', undefined)
  }
  else {
   callback(undefined, body.current.weather_descriptions + '. It is curently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
  }
 })
}


module.exports = forecast