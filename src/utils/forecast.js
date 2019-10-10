const request = require ('request')


const forecast =(latitude,longitude,callback)=>{
 
   const url = 'https://api.darksky.net/forecast/ae82f8aac31ab7c74dfc53b84d315328/'+ latitude +','+ longitude
 
  
   request({url, json: true}, (error, {body})=>{
      
    if (error){
        callback('Unable to connect to weather service', undefined)

    } else if(body.error){

        callback('Unable to find location haha', undefined)
   
    } else {
        console.log(body.daily.data[0])
        callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature  + ' There is a ' + body.currently.precipProbability + '% of rain')
    }

  })
 
}
module.exports = forecast