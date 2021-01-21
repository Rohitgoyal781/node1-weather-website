const request = require('request')

const forecast = (latitude,longitude,callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=c99e137bd79b26eee560308a705eb647&query='+ latitude + ',' + longitude +'&units=m'
  request({url, json: true },(error,{body}) => {
   if(error){
       callback('Unable to connect to Weather services',undefined)
   }
   else if(body.error)
   {
       callback('unable to find location',undefined)
   }
   else{
       callback(undefined,body.current.weather_descriptions+'. It is currently ' +body.current.temperature + ' degree out . But it feels like '+body.current.feelslike+'.It feels like there is '+body.current.precip+'% chances of rain today. '
            
       )
   }
  })
}

module.exports = forecast