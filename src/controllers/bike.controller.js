const { catchAsync } = require('../utils/error.utils');
const { validateCoordinates } = require('../utils/location.utils');
const BikeService = require('../services/bike.service');

exports.getAllBikes = catchAsync(async (req, res) => {
  const bikes = await BikeService.findAllBikes();
  res.json({ status: 'success', data: bikes });
});

exports.getNearbyBikes = catchAsync(async (req, res) => {
  const { longitude, latitude, maxDistance = 5000 } = req.query;
  const coordinates = validateCoordinates(longitude, latitude);
  
  const bikes = await BikeService.findNearbyBikes(
    coordinates.longitude,
    coordinates.latitude,
    maxDistance
  );
  
  res.json({ status: 'success', data: bikes });
});

exports.updateBikeStatus = catchAsync(async (req, res) => {
  const { bikeId } = req.params;
  const { status, location } = req.body;

  if (location) {
    validateCoordinates(location.longitude, location.latitude);
  }

  const bike = await BikeService.updateBikeStatus(bikeId, status, location);
  res.json({ status: 'success', data: bike });
});