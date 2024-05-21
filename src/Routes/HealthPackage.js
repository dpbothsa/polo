const express = require('express')
const router = express.Router();

const {createPackage, getPackagesWithTests,deletePackage,updatePackage} = require('../Controllers/HealthPackage/HealthPackage')

router.post('/' ,createPackage)
router.get('/',getPackagesWithTests)
router.put('/:id',updatePackage)
router.delete('/:id',deletePackage)


module.exports = router;


