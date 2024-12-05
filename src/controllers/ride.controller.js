const RideService = require('../services/ride.service');
const { catchAsync } = require('../utils/error.utils');

exports.startRide = catchAsync(async (req, res) => {
  const { bikeId, startLocation } = req.body;
  const ride = await RideService.startRide(req.user.id, bikeId, startLocation);
  res.status(201).json({ status: 'success', data: ride });
});

exports.endRide = catchAsync(async (req, res) => {
  const { rideId } = req.params;
  const { endLocation } = req.body;
  const ride = await RideService.endRide(rideId, endLocation);
  res.json({ status: 'success', data: ride });
});

exports.getUserRides = catchAsync(async (req, res) => {
  const rides = await RideService.getUserRides(req.user.id);
  res.json({ status: 'success', data: rides });
});