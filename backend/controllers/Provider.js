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