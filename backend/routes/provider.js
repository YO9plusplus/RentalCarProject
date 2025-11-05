const express = require('express');
const { createProvider } = require('../controllers/Provider');
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.route('/').post(protect, authorize('ADMIN'), createProvider)

module.exports=router;