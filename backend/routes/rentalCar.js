const express = require('express')
const router = express.Router();

const {getAllRentalCars,craeteRentalCar,deleteRentalCar,updateRentalCar} = require('../controllers/RentalCar')

const { protect, authorize } = require("../middleware/auth");

router.route('/').get(protect, getAllRentalCars).post(protect, authorize('ADMIN'),craeteRentalCar)
router.route('/id').delete(protect, authorize('ADMIN'),deleteRentalCar).put(protect, authorize('ADMIN'),updateRentalCar)

module.exports=router;