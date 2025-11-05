const express = require('express');
const { createBooking, getBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/booking');

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route('/')
    .get(protect, getBookings)
    
    router.route('/:id')
    .get(protect, getBooking)
    .put(protect, updateBooking)
    .delete(protect, deleteBooking)

router.route('/')
    .post(protect, authorize('USER'), createBooking);

module.exports = router;