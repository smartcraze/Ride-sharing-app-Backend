const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/profile', authenticate, userController.getProfile);
router.patch('/profile', authenticate, userController.updateProfile);

module.exports = router;