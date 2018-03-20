const postSaveHook = require('../utils/modelPostSaveHook')

const mongoose = require('mongoose')
const schema = mongoose.Schema({
    board: String,
    moisture: Number,
    isGrown: { type: Boolean, default: false },
    grownTime: String,
  },
  {
    timestamps: true
  })

schema.post('save', postSaveHook)

module.exports = mongoose.model('log', schema)