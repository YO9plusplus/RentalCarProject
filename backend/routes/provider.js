const express = require('express');
const { createProvider, getProvider } = require('../controllers/Provider');
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.route('/').post(protect, authorize('ADMIN'), createProvider)
router.route('/:id').get(protect,getProvider)

module.exports=router;