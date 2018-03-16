const postSaveHook = require('../utils/modelPostSaveHook')

const mongoose = require('mongoose')
const schema = mongoose.Schema({
    board: Number,
    moisture: Number,
    isGrown: Boolean
  },
  {
    timestamps: true
  })

schema.post('save', postSaveHook)

module.exports = mongoose.model('log', schema)