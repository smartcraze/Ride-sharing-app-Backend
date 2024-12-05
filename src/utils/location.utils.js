const validateCoordinates = (longitude, latitude) => {
  const validLongitude = parseFloat(longitude);
  const validLatitude = parseFloat(latitude);

  if (isNaN(validLongitude) || isNaN(validLatitude)) {
    throw new Error('Invalid coordinates provided');
  }

  if (validLongitude < -180 || validLongitude > 180) {
    throw new Error('Longitude must be between -180 and 180');
  }

  if (validLatitude < -90 || validLatitude > 90) {
    throw new Error('Latitude must be between -90 and 90');
  }

  return {
    longitude: validLongitude,
    latitude: validLatitude
  };
};

const createGeoPoint = (longitude, latitude) => ({
  type: 'Point',
  coordinates: [longitude, latitude]
});

module.exports = {
  validateCoordinates,
  createGeoPoint
};