const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia2FtaWthemljaHJpc3RhIiwiYSI6ImNrcjNqbWE4bzJsd3YzMXFwdnhteGY4N2MifQ.bfamhNGkJe60Y0dguGE6iA&limit=1'
 
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to mapbox',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location,try another search',undefined)
        }else{
            callback(undefined,{
                Longitude:body.features[0].center[0],
                latitude :body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
 }
 module.exports=geocode


// const request=require('request')
// const geocode=(address,callback)=>{
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia2FtaWthemljaHJpc3RhIiwiYSI6ImNrcjNqbWE4bzJsd3YzMXFwdnhteGY4N2MifQ.bfamhNGkJe60Y0dguGE6iA&limit=1'
 
//     request({url,json:true},(error,{body})=>{
//         if(error){
//             callback('Unable to connect to mapbox',undefined)
//         }else if(body.features.length===0){
//             callback('Unable to find location,try another search',undefined)
//         }else{
//             callback(undefined,{
//                 Longitude:body.features[0].center[0],
//                 latitude :body.features[0].center[1],
//                 location:body.features[0].place_name
//             })
//         }
//     })
//  }
//  module.exports=geocode