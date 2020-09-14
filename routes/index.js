const router = require('express').Router()
const controllers = require('../controllers')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.get('/getProfile', controllers.getProfile)

module.exports = router