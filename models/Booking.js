const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please add a booking data']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A booking must belong to a user']
    },
    car: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cars',
        required: [true, 'A booking must be for a car']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);