// Different routes of the application
const express = require('express')
const route = express.Router()
const controller = require('../controller/controller')
const store = require('../middleware/multer')

// Home route
route.get('/', controller.home)
route.post('/uploadmultiple', store.array('images', 12), controller.uploads)


module.exports = route