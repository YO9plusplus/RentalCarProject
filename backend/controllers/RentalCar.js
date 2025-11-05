// Make sure you are importing your Car model
const Car = require('../models/Car');

exports.getAllRentalCars = async (req, res, next) => {
  try {
    const rentalCar = await Car.find().populate('provider_id');
    res.status(200).json({
      success: true,
      data: rentalCar,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.craeteRentalCar = async(req,res,next)=>{
    try {
        const newCar = await Car.create(req.body);

        res.status(201).json({
        success: true,
        data: newCar,
        });

    } 
    catch (err) {
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ // 400 means "Bad Request"
                success: false,
                error: `Validation Error: ${message.join(', ')}`
            });
        } 
        else {
            console.error(err);
            res.status(500).json({
                success: false,
                error: 'Server Error: ' + err.message,
            });
        }
    }
}
// FIX 2: Correct parameter order (req, res, next)
exports.deleteRentalCar = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Delete rental car',
  });
};

// FIX 3: Correct parameter order (req, res, next)
exports.updateRentalCar = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Edit rental car',
  });
};