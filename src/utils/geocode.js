const request = require ('request')

const geocode = (address , callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/ ' +encodeURIComponent+ '.json?access_token=pk.eyJ1IjoiZ3VwdGFhbmlsIiwiYSI6ImNrMWFpbWd2ODBlZm0zbnI1aTM0cnV1NWUifQ.F-KPE4X_qxxlA_uR7AT7iQ'    
    
        request({url: url,json: true},(error, response)=>{
          if (error){
             callback('Unable to connect to location', undefined)
          } else if(response.body.features.length === 0){
             callback('Unable to find location. try another service', undefined)
           } else {
              callback(undefined,{
                 latitide: response.body.features[0].center[1],
                 langitude: response.body.features[0].center[0],
                 location: response.body.features[0].place_name 
                })
           }
        })
    }

    module.exports = geocode