import express from 'express';
import axios from 'axios';
import Product from '../models/Product.js';
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const useFake = (process.env.USE_FAKESTORE || 'false').toLowerCase() === 'true';
    if (useFake) {
      const url = process.env.FAKESTORE_URL || 'https://fakestoreapi.com/products?limit=8';
      const r = await axios.get(url);
      const items = r.data.map(p => ({ id: p.id, name: p.title, price: p.price, image: p.image }));
      return res.json(items);
    }

    const products = await Product.find({}).lean();
    const items = products.map(p => ({ id: p._id, name: p.name, price: p.price, image: p.image }));
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;
