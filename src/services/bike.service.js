const Bike = require('../models/bike.model');
const { AppError } = require('../utils/error.utils');
const { createGeoPoint } = require('../utils/location.utils');

class BikeService {
  async findAllBikes() {
    return await Bike.find();
  }

  async findNearbyBikes(longitude, latitude, maxDistance) {
    return await Bike.find({
      location: {
        $near: {
          $geometry: createGeoPoint(longitude, latitude),
          $maxDistance: parseInt(maxDistance)
        }
      },
      status: 'available'
    });
  }

  async updateBikeStatus(bikeId, status, location) {
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      throw new AppError('Bike not found', 404);
    }

    bike.status = status;
    if (location) {
      bike.location = createGeoPoint(location.longitude, location.latitude);
    }

    return await bike.save();
  }
}

module.exports = new BikeService();