const request = require('request')
const geocode = (address,callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoiZ295YWw3ODEiLCJhIjoiY2trMHh4b3FuMDR6cDJ3b2IyaGVkMjBkdiJ9.MoctlYaKfDoLcGgfXKqoKg'
  request({url, json: true },(error,{body}) => {
   if(error){
       callback('Unable to connect to location services',undefined)
   }
   else if(!body.features[0])
   {
       callback('unable to find location',undefined)
   }
   else{
       callback(undefined,{
        latitude: body.features[0].center[1]
         ,longitude:body.features[0].center[0],
         location: body.features[0].place_name
            
       })
   }
  })
}

module.exports = geocode