const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required:[true,'Please enter car brand']
    },

    model:{
        type: String,
        required: [true, 'Please enter car model']
    },
    type: {
        type: String,
        required: true,
        enum: ['Sedan', 'SUV', 'Truck', 'Van', 'Coupe'] // Example of validation
    },
    size: {
        type: String,
        enum: ['Compact', 'Mid-size', 'Full-size']
    },
    seats: {
        type: Number,
        required: true
    },
    daily_rate: {
        type: Number,
        required: true
    },
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarProvider', // Mongoose links this to the 'Provider' model
        required: true
    }
})

module.exports = mongoose.model('Cars',CarSchema)