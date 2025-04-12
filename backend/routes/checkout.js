
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/payment', async (req, res) => {
  const { amount } = req.body;  // amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/checkout', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total price
    const total = cart.items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    // Here’s where you integrate with Swift Payment or another processor
    // For demo, we simulate successful payment
    console.log(`Processing Swift payment of $${total} for user ${req.user.id}`);

    // Save order (optional)
    // Clear cart after "successful" payment
    cart.items = [];
    await cart.save();

    return res.status(200).json({
      message: 'Payment successful & cart cleared',
      amountPaid: total,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ message: 'Checkout failed' });
  }
});


module.exports = router;
