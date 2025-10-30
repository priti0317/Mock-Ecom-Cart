import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js"; // ✅ Import authentication middleware

const router = express.Router();

/**
 * 🛒 POST /api/cart
 * Add an item to the logged-in user's cart
 */
router.post("/", auth, async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!productId || !qty) {
      return res.status(400).json({ error: "productId and qty are required" });
    }

    // ✅ Check if the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // ✅ Check if item already exists in user's cart
    let cartItem = await CartItem.findOne({ user: req.user.id, productId });

    if (cartItem) {
      // Update quantity if already exists
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      // Otherwise, create new cart item
      cartItem = await CartItem.create({
        user: req.user.id,
        productId,
        qty,
      });
    }

    // ✅ Populate product details for response
    const populated = await cartItem.populate("productId");
    res.status(201).json({
      id: populated._id,
      productId: populated.productId._id,
      name: populated.productId.name,
      price: populated.productId.price,
      image: populated.productId.image,
      qty: populated.qty,
    });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

/**
 * ❌ DELETE /api/cart/:id
 * Remove an item from the user's cart
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ Ensure only user's own item can be deleted
    });

    if (!cartItem)
      return res.status(404).json({ error: "Item not found or unauthorized" });

    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error removing item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

/**
 * 📦 GET /api/cart
 * Fetch all items for the logged-in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const items = await CartItem.find({ user: req.user.id })
      .populate("productId")
      .lean();

    const mapped = items.map((it) => ({
      id: it._id,
      productId: it.productId._id,
      name: it.productId.name,
      price: it.productId.price,
      image: it.productId.image,
      qty: it.qty,
    }));

    const total = mapped.reduce((sum, it) => sum + it.price * it.qty, 0);

    res.json({ items: mapped, total: Number(total.toFixed(2)) });
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

export default router;
