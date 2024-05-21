const express = require('express')
const router = express.Router();

const {createUser, loginUser} = require('../Controllers/User/User')

router.post('/',createUser)
router.post('/login',loginUser)



module.exports = router