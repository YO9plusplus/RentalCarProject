const mongoose = require('mongoose')

const CarProviderSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please enter a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },

    address:{
        type: String,
        required:[true, 'please enter an address']
    },

    telephone:{
        type:String
    },
})

module.exports=mongoose.model('CarProvider',CarProviderSchema)