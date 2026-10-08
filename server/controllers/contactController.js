import ContactMessage from '../models/ContactMessage.js';
import sendEmail from '../utils/sendEmail.js';

// Temporary in-memory store if DB is disconnected
const inMemoryMessages = [];

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public (Rate limited)
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    let contactDoc = null;
    try {
      contactDoc = await ContactMessage.create({
        name,
        email,
        subject: subject || 'Portfolio Inquiry',
        message,
        ipAddress,
      });
    } catch (dbErr) {
      console.warn('[Contact DB Warning] Could not save to DB, using in-memory store:', dbErr.message);
      contactDoc = {
        _id: 'msg_' + Date.now(),
        name,
        email,
        subject: subject || 'Portfolio Inquiry',
        message,
        ipAddress,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      inMemoryMessages.unshift(contactDoc);
    }

    // Trigger email notification in background asynchronously
    sendEmail({
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
    }).catch((emailErr) => {
      console.error('[Contact Email Warning] Email send error:', emailErr.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: contactDoc,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
export const getMessages = async (req, res, next) => {
  try {
    let messages = [];
    try {
      messages = await ContactMessage.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn('[Contact DB Warning] Fetching from in-memory fallback store');
      messages = inMemoryMessages;
    }

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteMessage = async (req, res, next) => {
  try {
    try {
      const msg = await ContactMessage.findById(req.params.id);
      if (msg) {
        await msg.deleteOne();
      }
    } catch (dbErr) {
      const idx = inMemoryMessages.findIndex((m) => m._id === req.params.id);
      if (idx !== -1) {
        inMemoryMessages.splice(idx, 1);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
