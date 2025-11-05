const express = require('express');
const { createBooking } = require('../controllers/booking');

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route('/')
    .post(protect, authorize('USER'), createBooking);

module.exports = router;