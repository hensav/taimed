const asyncMiddleware = require('./utils/asyncMiddleware')
const router = require('express').Router()
const log = require('./controllers/log')

router.get('/log', asyncMiddleware(log.save))
router.get('/', asyncMiddleware(log.index))

module.exports = router
