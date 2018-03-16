const asyncMiddleware = require('./utils/asyncMiddleware')
const router = require('express').Router()
const log = require('./controllers/log')

router.get('/create', asyncMiddleware(log.create))
router.get('/getAverage', asyncMiddleware(log.getAverage))
router.get('/getFinished', asyncMiddleware(log.getFinished))

router.get('/', asyncMiddleware(log.index))

module.exports = router
