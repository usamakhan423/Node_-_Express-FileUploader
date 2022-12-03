const express = require('express')
const app = express()
const path = require('path')
const router = require('./server/routes/router')

const port = process.env.PORT || 4040

app.use(express.json())
app.use('/', router)

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Connect mongodb server
require('./server/database/database')()

// set view engine
app.set('view engine', 'ejs')




app.listen(port, ()=> {
  console.log(`Server started on port ${port}`)
})