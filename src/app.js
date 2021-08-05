const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Kami christella'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Kami christella'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'We help you everywhere',
        title:'Help',
        name:'Kami christella'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return   res.send({
            Error:'No address is provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
  
    // res.send({
    //     // forecast:forecastData,
    //     location:'Kigali',
    //     address:req.query.address
    // })
   
})
app.get('/products',(req,res)=>{
     if(!req.query.search){
return res.send({
    error:'You must provide a search team'
})
     }

   console.log( req.query.search)
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res)=>{
 res.render('error',{
     title:'404',
     errorMessage:'help article not found',
     name:'Kami christella'
 })
})
app.get('*',(req,res)=>{
  res.render('error',{
    errorMessage:'My 404 page',
    name:'Kami christella'
  })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})