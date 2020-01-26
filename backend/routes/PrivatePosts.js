const router = require('express').Router()
const verify = require('./verifyToken')


//index(getall), show , store, update, destroy

router.get('/', verify, (request, response) => {
    response.send('private post')
})


module.exports = router