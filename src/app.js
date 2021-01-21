const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs=require('hbs')
const { title } = require('process')
const app = express()

//Define paths for express config
const publicDirectorypath=path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)


//setup static directory to serve 
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Rohit'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Rohit'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Rohit',
        message:'We are here to help'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        res.send('Please enter a address')
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
                address: req.query.address
            })
        })
    })

})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'Error',
        name:'Rohit',
    text:'Help article not found '})
        })


app.get('*',(req,res)=>{
res.render('404',{
title:'Error',
name:'Rohit',
text:'Page not Found '})
})


app.listen(3000,()=>{
   console.log('server is up on port 3000') 
})