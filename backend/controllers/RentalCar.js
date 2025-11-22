// Make sure you are importing your Car model
const Car = require('../models/Car');
const Providers = require('../models/Providers');

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

exports.createRentalCar = async(req,res,next)=>{
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
exports.deleteRentalCar = async (req, res, next) => {
  try{
    const car = await Car.findById(req.params.id)

    if(!car){
      return res.status(400).json({
        success:false,
        msg:'Cannot delete this car'
      })
    }
    if (car.user.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(401).json({ 
                success: false, 
                msg: `User ${req.user.id} is not authorized to update this car`
            });
        }
    await Car.deleteOne({_id:req.param.id})
    await Booking.deleteMany({car:req.params.id})
    res.status(200).json({
      success: true,
      msg: 'Delete rental car',
    });
  }
  catch(error){
    res.status(500)
  }
};

exports.updateRentalCar = async (req, res, next) => {
  try{
    const car = await Car.findById(req.params.id)

    if (!car) {
      return res.status(404).json({
        success:false,
        msg:`There is no car with ${req.params.id} to be updated`
      })
    }
    if (car.user.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(401).json({ 
                success: false, 
                msg: `User ${req.user.id} is not authorized to update this car`
            });
        }
    
    await Car.updateOne(req.params.id,req.body,{
      new:true,
      runValidators:true
    })
    res.status(200).json({
      success: true,
      msg: 'Edit rental car',
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      msg:'Cannot update rental car'
    })
  }
};

exports.getRentalCar = async (req,res,next)=>{
  try{
    const car = await Car.findById(req.params.id);

    res.status(200).json({
      success:true,
      data:car
    })
  }
  catch(error){
    res.status(500).json({
      sucess:false,
      msg: 'There is no car with this id'
    })
  }

}