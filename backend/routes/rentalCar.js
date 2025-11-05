const express = require('express')
const router = express.Router();

const {getAllRentalCars,craeteRentalCar,deleteRentalCar,updateRentalCar} = require('../controllers/RentalCar')

const app = express()

router.route('/').get(getAllRentalCars).post(craeteRentalCar)
router.route('/id').delete(deleteRentalCar).put(updateRentalCar)

module.exports=router;