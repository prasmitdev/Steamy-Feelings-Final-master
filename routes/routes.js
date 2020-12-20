const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.get('/', controller.getRequest);

router.post('/', controller.postRequest, controller.getRequest);

module.exports = router;