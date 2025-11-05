const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

BookingSchema.plugin(AutoIncrement, {
  inc_field: 'bookingNumber',   // The name of the new field
  id: 'bookingNums',            // A unique ID for this counter
  start_seq: 1001,              // Start counting from 1001
});

module.exports = mongoose.model('Booking', BookingSchema);