const express = require('express')
const router = express.Router();

const {createTest, getAllTests,updateTest,deleteTest, GetLabTests,GetScans} = require('../Controllers/Test/Test')

router.post('/',createTest)
router.get('/',getAllTests)
router.put('/:id',updateTest)
router.delete('/:id',deleteTest)

router.get('/lab',GetLabTests)
router.get('/scan',GetScans)


module.exports = router