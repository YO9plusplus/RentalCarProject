const express = require('express')
const router = express.Router();

const {getAllRentalCars,createRentalCar,deleteRentalCar,updateRentalCar,getRentalCar} = require('../controllers/RentalCar')

const { protect, authorize } = require("../middleware/auth");

router.route('/').get(protect, getAllRentalCars).post(protect, authorize('ADMIN'),createRentalCar)
router.route('/:id').delete(protect, authorize('ADMIN'),deleteRentalCar).put(protect, authorize('ADMIN'),updateRentalCar).get(protect,getRentalCar)

module.exports=router;