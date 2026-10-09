import mongoose from 'mongoose';
import User from '../models/User.js';

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password',
      });
    }

    const inputEmail = email.toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || 'ankitkumar952390@gmail.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Ankit2026#Secure';

    // 1. Check direct match against environment admin credentials
    if (inputEmail === adminEmail && password === adminPassword) {
      const adminUser = new User({
        _id: '650000000000000000000001',
        name: 'Ankit Kumar',
        email: adminEmail,
        role: 'admin',
      });
      const token = adminUser.getSignedJwtToken();
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: '650000000000000000000001',
          name: 'Ankit Kumar',
          email: adminEmail,
          role: 'admin',
        },
      });
    }

    // 2. Try matching user in MongoDB database
    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne({ email: inputEmail }).select('+password');
      } catch (dbErr) {
        console.warn('[Auth DB Warning] Database query failed:', dbErr.message);
      }
    }

    if (user) {
      const isMatch = await user.matchPassword(password);
      if (isMatch) {
        const token = user.getSignedJwtToken();
        return res.status(200).json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private (JWT Required)
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
