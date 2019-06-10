const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils.js/geocode')
const forecast=require('./utils.js/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup Handlebars engine an views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res) => { 
	res.render('index',{
		title: 'Weather App',
		name: 'Javier Aquique'
	})
})

app.get('/about',(req,res) => { 
	res.render('about',{
		title: 'About',
		name: 'Javier Aquique'
	})
})

app.get('/help',(req,res) => { 
	res.render('help',{
		title: 'Help',
		name: 'Javier Aquique'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'No address given!'
		})
	}
	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
		}
		
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
				location,
				Forecast: forecastData,
				address: req.query.address
		
			})
        })
    })
})

app.get('/products',(req, res)=>{
	if(!req.query.search){
		return res.send({
			error:'Should provide a search term'
		})
	}
		console.log(req.query.search)
		res.send({
			products: []
		})
	
})

app.get('/help/*', (req, res) => {
	res.render('error',{
		message: 'Help article not found',
		name: 'Javier Aquique'

	})
})

app.get('*',(req,res) => { 
	res.render('error',{
		message: 'Page not found',
		name: 'Javier Aquique'
	})
})

app.listen(port, () =>{
	console.log('Server is up on port '+port)
})

// app.get('/help', (req, res) => {
// 	res.send([{
// 		name: 'Javier',
// 		age: 33
// 	},{
// 		name: 'Marzena',
// 		age: 35
// 	}])
// })

// app.get('/about', (req, res) => {
// 	res.send('<h1>Howdy partner</h1>')
// })


//app.com
//app.com/help
//app.com/about

