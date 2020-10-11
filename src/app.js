const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
 res.render('index', {
  start: 'Hello, welcome to home page!',
  title: 'Weather',
  name: 'Ömer'
 })
})


app.get('/about', (req, res) => {
 res.render('about', {
  title: 'About',
  name: 'Ömer'
 })
})

app.get('/help', (req, res) => {
 res.render('help', {
  message: 'If you need help please contact us.',
  title: 'Help',
  name: 'Ömer'
 })
})

app.get('/weather', (req, res) => {
 if (!req.query.address) {
  return res.send({
   error: 'You must provide a search term!'
  })
 }
 geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
  if (error) {
   return res.send({ error })
  }
  forecast(longitude, latitude, (error, forecastData) => {
   if (error) {
    return res.send({ error })
   }
   res.send({
    forecast: forecastData,
    location,
    address: req.query.address
   })
  })
 })

})

app.get('/products', (req, res) => {
 if (!req.query.search) {
  return res.send({
   error: 'You must provide a search term'
  })
 }

 console.log(req.query.search)
 res.send({
  product: []
 })
})

app.get('/help/*', (req, res) => {
 res.render('render', {
  title: '404',
  name: 'Ömer',
  errorMessage: 'help article not found'
 })
})

app.get('*', (req, res) => {
 res.render('404', {
  title: '404',
  name: 'Ömer',
  errorMessage: 'page not found'
 })
})

app.listen(3000, () => {
 console.log("server is up on port " + port)
})