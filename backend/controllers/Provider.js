const Providers = require('../models/Providers');
const Provider = require('../models/Providers');

// POST /api/providers
// Creates a new Provider
exports.createProvider = async (req, res) => {
    try {
        // This logic is moved from server-mongoose.js
        const { name, address, telephone } = req.body;
        if (!name || !address) {
            return res.status(400).json({ error: "Missing name or address" });
        }

        const newProvider = await Provider.create({ name, address, telephone });
        res.status(201).json(newProvider);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getProvider = async (req,res,next) =>{
    try {
        const provider = await Providers.findById(req.params.id)
        res.status(200).json({
            success:true,
            data:provider
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            msg: `No provider found with this ${req.params.id} id`
        })
    }
}