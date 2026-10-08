import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route, no token provided',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_jwt_key_ankit_2026_change_in_production'
    );

    let userDoc = null;
    if (decoded.id) {
      try {
        userDoc = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        userDoc = null;
      }
    }

    req.user = userDoc || {
      id: decoded.id || '650000000000000000000001',
      name: decoded.name || 'Ankit Kumar',
      email: decoded.email || process.env.ADMIN_EMAIL || 'ankitkumar952390@gmail.com',
      role: decoded.role || 'admin',
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route, invalid or expired token',
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Admin rights required',
    });
  }
};
