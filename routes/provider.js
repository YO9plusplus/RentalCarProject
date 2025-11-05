const express = require('express');
const { createProvider } = require('../controllers/Provider');
const router = express.Router();


const app = express()

router.route('/').post(createProvider)

module.exports=router;