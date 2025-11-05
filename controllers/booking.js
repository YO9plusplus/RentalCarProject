const Booking = require('../models/Booking');
const Car = require('../models/Car');

/**
 * @desc    Create a new booking
 * @route   POST /api/v1/bookings
 * @access  Private (User Only)
 */
exports.createBooking = async (req, res, next) => {
    try {
        req.body.user = req.user.id;

        const userBookings = await Booking.find({ user: req.user.id });

        if (userBookings.length >= 3) {
            return res.status(400).json({succes: false, msg: `User ${req.user.name} has already made 3 bookings. You cannot book more.`});
        }

        const car = await Car.findById(req.body.car);
        if (!car) 
            return res.status(404).json({success: false, msg: `Car not found with id ${req.body.car}`});

        const booking = await Booking.create(req.body);

        res.status(201).json({success: true, data: booking});
    } catch(err) {
        console.log(err);
        return res.status(500).json({success: false, msg: 'Server Error'});
    }
}

/**
 * 
 */