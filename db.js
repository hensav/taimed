const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('debug', true)

module.exports = mongoose.connect(process.env.MONGODB_URI)

