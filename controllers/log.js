const axios = require('axios')
const Log = require('../models/log')

exports.create = async (req, res) => {
  const { board, moisture, isGrown } = req.query

  const existsGrown = await Log.find( {
    $and : [
      { isGrown: { $all: [ true ] } },
      { board: board }
    ]
  } )

  if (existsGrown.length  > 0) throw new Error('Already grown')

  const log = await new Log({
    board,
    moisture,
    isGrown
  }).save()

  if (!log) throw new Error('Not created')
  return res.status(201).send({ message: 'Sent to log' })
}

exports.getAverage = async (req, res) => {
  const avg = await Log.aggregate(
    [
      {
        $group:
          {
            _id: "$board",
            avgMoisture: { $avg: "$moisture" }
          }
      }
    ]
  )
  return res.status(201).send({ avg })
}

exports.getFinished = async (req, res) => {
  const finished =  await Log.find( { isGrown: { $all: [ true ] } } )
  return res.status(201).send({ finished })
}
