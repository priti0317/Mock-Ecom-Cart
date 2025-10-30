import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import checkoutRouter from './routes/checkout.js';
import userRouter from './routes/user.js';

// ✅ Fix: load .env manually using absolute path (works with OneDrive)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Check if .env is now loaded
console.log("JWT Secret:", process.env.JWT_SECRET);

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vibe-ecom')
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Backend (Mongo) running on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Mongo connection error', err);
    process.exit(1);
  });
