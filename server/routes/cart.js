const express = require('express');
const router = express.Router();
const Cart = require('../model/cart');

// Add a product to the cart
router.post('/', async (req, res) => {
  const { userId, product } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [product] });
    } else {
      cart.products.push(product);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove a product from the cart
router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.products = cart.products.filter(product => product.id !== productId);
      await cart.save();
      res.status(200).json(productId);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
