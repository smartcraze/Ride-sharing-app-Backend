const express = require('express');
const bikeController = require('../controllers/bike.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticate, bikeController.getAllBikes);
router.get('/nearby', authenticate, bikeController.getNearbyBikes);
router.patch('/:bikeId/status', authenticate, bikeController.updateBikeStatus);

module.exports = router;