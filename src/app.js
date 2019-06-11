const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//for location Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory on public file
app.use(express.static(publicDirectoryPath))
//short form of request and resource

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'aks amit sah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'aks amit sah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'aks amit sah'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(res.query)
    res.send({
        aks: []
    })
})

app.get('/json', (req, res) => {
    res.send({
        data: [
            {
                name: 'aks',
                age: 21
            },
            {
                name: 'aks1',
                age: 211
            }
        ]
    }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit Sah',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit Sah',
        errorMessage: 'Page Not Found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 30000. !')
})