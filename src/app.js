const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port =process.env.PORT  || 3000

//define path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars anegine and view locations
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup statis directory to use 
app.use(express.static(publicDirectory))

app.get('',(req, res)=>{
    res.render('index',{
        title:'weather app',
        name:'ashish'
     } )
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about tile',
        name:'Ashish'
    })

})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'this is my help text',
        title:'HELP',
        name:'Ashish'
    })

})

app.get('/products',(req,res)=>{
if(!req.query.search){
     return res.send({
         error:'You must provide a search term'
     })
}
console.log(req.query.search)

    res.send({
        product:[]
    })
})




app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }


    geocode(req.query.address,(error,{latitude, longitude,location})=>{
        if(error){
            return res.send({error })
        }

      forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
          return res.send({error})
          }


         else{
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
         }
       })  
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
      title:'404',
      name:'Ashish',
      errorMessage:'Page not found'
    })
})
  


app.get('*',(req,res)=>{
  res.render('404',{
      title :'404',
      name:'Ashish',
      errorMessage:'Page not found'
    })
})




app.listen(port,() =>{
      console.log('Server is on port' + port)
})