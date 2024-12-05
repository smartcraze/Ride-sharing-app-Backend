const express = require('express');
const rideController = require('../controllers/ride.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/start', authenticate, rideController.startRide);
router.post('/:rideId/end', authenticate, rideController.endRide);
router.get('/history', authenticate, rideController.getUserRides);

module.exports = router;