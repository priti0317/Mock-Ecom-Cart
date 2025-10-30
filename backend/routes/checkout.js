import express from 'express';
import Receipt from '../models/Receipt.js';
import CartItem from '../models/CartItem.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js'; // verifies JWT and sets req.user

const router = express.Router();

/**
 * POST /api/checkout
 * Header: Authorization: Bearer <token>
 */
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user?.id;

    // 🟢 Debug logs
    console.log('🧩 Decoded user from token:', req.user);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - No user ID found' });
    }

    // 🧠 Fetch user from DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 🛒 Fetch this user’s cart
    const cartItems = await CartItem.find({ user: userId }).populate('productId');
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty' });
    }

    // 💰 Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * (item.qty || 0),
      0
    );

    // 🧾 Create receipt automatically with user info
    const receiptDoc = await Receipt.create({
      user: userId,
      name: user.name,
      email: user.email,
      total: Number(total.toFixed(2)),
      timestamp: new Date(),
    });

    // 🧹 Clear only this user’s cart
    await CartItem.deleteMany({ user: userId });

    // ✅ Send response
    res.status(201).json({
      message: 'Checkout successful',
      receiptId: receiptDoc._id,
      total: receiptDoc.total,
      timestamp: receiptDoc.timestamp,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('❌ Checkout failed:', err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

export default router;
