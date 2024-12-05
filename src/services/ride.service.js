const Ride = require('../models/ride.model');
const BikeService = require('./bike.service');
const { AppError } = require('../utils/error.utils');
const { createGeoPoint } = require('../utils/location.utils');

class RideService {
  async startRide(userId, bikeId, startLocation) {
    const bike = await BikeService.updateBikeStatus(bikeId, 'in-use');
    if (bike.status !== 'available') {
      throw new AppError('Bike is not available', 400);
    }

    const ride = new Ride({
      user: userId,
      bike: bikeId,
      startLocation: createGeoPoint(startLocation.longitude, startLocation.latitude)
    });

    return await ride.save();
  }

  async endRide(rideId, endLocation) {
    const ride = await Ride.findById(rideId);
    if (!ride || ride.status !== 'active') {
      throw new AppError('Invalid ride', 400);
    }

    const endTime = new Date();
    const duration = (endTime - ride.startTime) / 1000 / 60;
    
    ride.endTime = endTime;
    ride.endLocation = createGeoPoint(endLocation.longitude, endLocation.latitude);
    ride.status = 'completed';
    ride.cost = this.calculateRideCost(duration);

    await ride.save();
    await BikeService.updateBikeStatus(
      ride.bike,
      'available',
      endLocation
    );

    return ride;
  }

  async getUserRides(userId) {
    return await Ride.find({ user: userId })
      .populate('bike', 'bikeId model')
      .sort({ startTime: -1 });
  }

  calculateRideCost(durationInMinutes) {
    const baseRate = 2;
    const perMinuteRate = 0.15;
    return baseRate + (durationInMinutes * perMinuteRate);
  }
}

module.exports = new RideService();