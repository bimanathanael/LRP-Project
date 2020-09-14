const router = require('express').Router()
const controllers = require('../controllers')

router.get('/', controllers.welcome)

module.exports = router