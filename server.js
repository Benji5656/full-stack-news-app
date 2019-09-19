const bodyParser = require( 'body-parser' )
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const api = require('./server/routes/api')

// serving files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )


// Mongoose setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/NewsApp', { useNewUrlParser: true})

app.use('/', api)


const port = 4320
app.listen(process.env.PORT || port, () => console.log(`Running on port ${port}`))
