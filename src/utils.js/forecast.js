const request =require('request')
const forecast = (longitude,latitude,callback)=>{
    url='https://api.darksky.net/forecast/0be05ecd3e320efeb8f8439544a0b168/'+latitude+','+longitude+'?units=si&lang=en'
    
    request({url:url, json:true},(error,{body})=>{
        const {currently,error2} = body
        const {summary,temperature} = currently
        if(error){
            callback('Unable to connect to weather services', undefined)      
        }else if(error2){
        	callback('Unable to find  for weather, try later', undefined)
        }else{
            callback(undefined,{ 
                Forecast: 'The weather is '+summary+ ' and the temperature is ' +temperature
                
                
            })
      }
    })
}
module.exports = forecast