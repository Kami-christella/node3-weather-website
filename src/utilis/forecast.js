const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7b0baf37188a8abe30c69fb64952d134&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather stack',undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}, It is currently ${body.current.temperature} .It feels like ${body.current.feelslike}.Thanks`)
        }
    })
} 


module.exports=forecast