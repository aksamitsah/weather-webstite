const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWtzYW1pdHNhaCIsImEiOiJjandnbWg5eXgwYXNoNDVsYmtlNjd1ZXdmIn0.AdP25t5EwJnuTYx3mbMcww&limit=1'
    request({ url }, (error, {body}) => {
      if (error) {
        callback('Unable to connect to location service!',undefined)
      }
      else {
        const data = JSON.parse(body)
        if (data.features.length === 0) {
          callback('Unable to find location. Try another search. ',undefined)
        }
        else {
          callback(undefined,{
            latitude:data.features[0].center[1],
            longitude:data.features[0].center[0],
            location:data.features[0].place_name
  
          })
          
        }
  
      }
    })
  }
module.exports=geocode