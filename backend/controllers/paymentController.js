const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');

const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Credit packs available
const CREDIT_PACKS = {
  starter: { credits: 5,  amount: 9900,  label: 'Starter Pack' },   // ₹99
  pro:     { credits: 15, amount: 24900, label: 'Pro Pack' },        // ₹249
  elite:   { credits: 30, amount: 44900, label: 'Elite Pack' },      // ₹449
};

exports.createOrder = async (req, res) => {
  try {
    const { pack } = req.body;
    const selected = CREDIT_PACKS[pack];
    if (!selected) return res.status(400).json({ message: 'Invalid pack selected' });

    const razorpay = getRazorpay();
    const options = {
      amount: selected.amount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: { pack, userId: String(req.user.userId) },
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, pack, credits: selected.credits });
  } catch (err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ message: 'Failed to create payment order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, pack } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const selected = CREDIT_PACKS[pack];
    if (!selected) return res.status(400).json({ message: 'Invalid pack' });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $inc: { credits: selected.credits } },
      { returnDocument: 'after' }
    );

    res.json({ success: true, credits: user.credits, message: `${selected.credits} credits added!` });
  } catch (err) {
    console.error('Payment verify error:', err);
    res.status(500).json({ message: 'Payment verification error' });
  }
};
