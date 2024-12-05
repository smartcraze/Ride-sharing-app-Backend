const User = require('../models/user.model');
const { AppError } = require('../utils/error.utils');

class UserService {
  async findUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateUser(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const allowedUpdates = ['firstName', 'lastName', 'phone'];
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        user[key] = updateData[key];
      }
    });

    await user.save();
    return user;
  }
}

module.exports = new UserService();