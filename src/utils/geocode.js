const request = require('request')

const geoCode = (adress, callback) => {
 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiY3VsdHJpeCIsImEiOiJja2ZwcDAwYTYwYjhsMnFwYnc0b3lvenF5In0.L3NQuXGAf8QCLL76SX8wsg&limit=1'

 request({ url, json: true }, (error, { body }) => {
  if (error) {
   callback('Unable to connect to location service!', undefined)
  }
  else if (body.features.length === 0) {
   callback('Unable to find location, try another search!', undefined)
  }
  else {
   callback(undefined, {
    latitude: body.features[0].center[0],
    longitude: body.features[0].center[1],
    location: body.features[0].place_name
   })
  }
 })
}


module.exports = geoCode