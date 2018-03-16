const axios = require('axios')
const Log = require('../models/log')

exports.save = async (req, res) => {
  const { board, moisture, isGrown } = req.query

  const log = await new Log({
    board,
    moisture,
    isGrown
  }).save()

  if (!log) throw new Error('Not created')

  return res.status(201).send({ message: 'Sent to log' })
}
