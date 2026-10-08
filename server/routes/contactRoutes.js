import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  submitContact,
  getMessages,
  deleteMessage,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];

router.post('/', contactLimiter, validateContact, submitContact);
router.get('/', protect, adminOnly, getMessages);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;
