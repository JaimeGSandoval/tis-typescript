import { body } from 'express-validator';

const registerSchema = [
  body('userName')
    .trim()
    .custom((value) => !/\s/.test(value))
    .isLength({ min: 5, max: 20 })
    .withMessage('User name must be between 5 and 20 characters long'),
  body('email').isEmail().withMessage('Email must contain a valid email address'),
  body('password')
    .trim()
    .custom((value) => !/\s/.test(value))
    .isLength({ min: 6, max: Number(process.env.MAX_PASSWORD_LENGTH) })
    .withMessage('Password must be at least 6 characters long'),
];

export default registerSchema;
