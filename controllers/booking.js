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
            return res.status(400).json({success: false, msg: `User ${req.user.name} has already made 3 bookings. You cannot book more.`});
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
 * @desc    Get all bookings (Admin) or user's bookings (User)
 * @route   GET /api/v1/bookings
 * @access  Private (User and Admin)
 */
exports.getBookings = async (req, res, next) => {
    try {
        let query;

        if (req.user.role === 'ADMIN') {
            query = Booking.find()
                .populate('user', 'name telephone email')
                .populate('car');
        } else {
            query = Booking.find({ user: req.user.id })
                .populate('car');
        }

        const bookings = await query;

        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: 'Server Error' });
    }
}

/**
 * @desc    Get a single booking
 * @route   GET /api/v1/bookings/:id
 * @access  Private (User and Admin)
 */
exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email')
            .populate('car');
        
        if (!booking) {
            return res.status(404).json({ success: false, msg: `Booking not found with id of ${req.params.id}` });
        }

        if (booking.user.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(401).json({ 
                success: false, 
                msg: `User ${req.user.id} is not authorized to update this booking`
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ success: false, msg: 'Server Error' });
    }
}

/**
 * @desc    Update a booking
 * @route   PUT /api/v1/bookings/:id
 * @access  Private (User and Admin)
 */
exports.updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) 
            return res.status(404).json({ success: false, msg: `The booking id ${req.params.id} is not found`});

        if (booking.user.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(401).json({ 
                success: false, 
                msg: `User ${req.user.id} is not authorized to update this booking`
            });
        }

        const updates = {
            date: req.body.date,
            car: req.body.car
        };

        booking = await Booking.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: booking});
    } catch(err) {
        console.log(err);
        res.status(500).json({ success: false, msg: 'Server Error'});
    }
}

/**
 * @desc    Delete a booking
 * @route   DELETE /api/v1/bookings/:id
 * @access  Private (User and Admin)
 */
exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) 
            return res.status(404).json({ success: false, msg: `Booking id ${req.params.id} is not found`});

        if (booking.user.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(401).json({ 
                success: false, 
                msg: `User ${req.user.id} is not authorized to update this booking`
            });
        }

        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, data: {}});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: 'Server Error'});
    }
}