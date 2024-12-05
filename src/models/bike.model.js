const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  bikeId: {
    type: String,
    required: true,
    unique: true
  },
  model: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'in-use', 'maintenance'],
    default: 'available'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  batteryLevel: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  lastMaintenance: {
    type: Date,
    default: Date.now
  }
});

bikeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Bike', bikeSchema);