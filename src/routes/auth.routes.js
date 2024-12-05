const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('phone').trim().notEmpty(),
  ],
  authController.register
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  authController.login
);

module.exports = router;
