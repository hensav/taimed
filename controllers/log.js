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
            avgMoisture: { $avg: "$moisture" },
            isGrown: { $push:  { isGrown: "$isGrown"} },
            time: { $push:  { createdAt: "$createdAt"} }

          }
      }
    ]
  )

  const getLatestDate = arr =>
    arr.length > 0 ? arr.reduce((m, i) => (i.createdAt > m) && i || m, "").createdAt : null

  let data = avg.map(person => {
    let grown = person.isGrown.filter(x => x.isGrown === true)

    if(grown.length > 0) {
      person.isGrown = "true"
      person.time = getLatestDate(person.time)
    } else {
      person.isGrown = "false"
      person.time = ""
    }
    return person
  })
  return res.status(201).send({ data })
}

exports.getFinished = async (req, res) => {
  const finished =  await Log.find( { isGrown: { $all: [ true ] } } )
  return res.status(201).send({ finished })
}
