const request = require ('request')


const forecast =(latitude,longitude,callback)=>{
 
   const url = 'https://api.darksky.net/forecast/ae82f8aac31ab7c74dfc53b84d315328/'+ latitude +','+ longitude
 
  request({url: url, json: true}, (error, response)=>{
      
    if (error){
        callback('Unable to connect to weather service', undefined)

    } else if(response.body.error){

        callback('Unable to find location haha', undefined)
   
    } else {

        callback(undefined,response.body.daily.data[0].summary + 'It is currently ' +  response.body.currently.temperature  + ' There is a ' + response.body.currently.precipProbability + '% of rain')
    }

  })
 
}
module.exports = forecast