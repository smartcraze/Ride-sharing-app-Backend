const UserService = require('../services/user.service');
const { catchAsync } = require('../utils/error.utils');

exports.getProfile = catchAsync(async (req, res) => {
  const user = await UserService.findUserById(req.user.id);
  res.json({ status: 'success', data: user });
});

exports.updateProfile = catchAsync(async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  const user = await UserService.updateUser(req.user.id, { firstName, lastName, phone });
  
  res.json({
    status: 'success',
    data: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    }
  });
});