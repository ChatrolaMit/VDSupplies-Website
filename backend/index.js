require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Stripe Webhook needs raw body
app.post('/api/webhook', express.raw({ type: '*/*' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  let payload = req.body;

  try {
    // If something parsed it as an object (which shouldn't happen here), stringify it
    if (payload && typeof payload === 'object' && !Buffer.isBuffer(payload)) {
      payload = JSON.stringify(payload);
    }
    
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
    const sessionOrIntent = event.data.object;
    
    try {
      const { cartItems, productId, quantity, userId, orderId } = sessionOrIntent.metadata || {};
      if (!cartItems && !productId) {
        console.log('Skipping webhook, no cart items in metadata');
        return res.send();
      }

      let items = [];
      if (cartItems) {
        items = JSON.parse(cartItems);
      } else if (productId) {
        items = [{ productId: productId, quantity: parseInt(quantity, 10) }];
      }

      // Determine amount (session uses amount_total, intent uses amount)
      const totalAmount = sessionOrIntent.amount_total || sessionOrIntent.amount;
      const currency = sessionOrIntent.currency;
      
      let customerEmail = sessionOrIntent.customer_details?.email || sessionOrIntent.customer_email || sessionOrIntent.receipt_email || '';
      let customerName = sessionOrIntent.charges?.data?.[0]?.billing_details?.name || sessionOrIntent.customer_details?.name || sessionOrIntent.shipping?.name || '';
      let shippingAddress = sessionOrIntent.shipping_details?.address || sessionOrIntent.shipping?.address || null;
      let customerPhone = sessionOrIntent.charges?.data?.[0]?.billing_details?.phone || sessionOrIntent.customer_details?.phone || '';

      if (event.type === 'payment_intent.succeeded' && sessionOrIntent.payment_method) {
        try {
          const pm = await stripe.paymentMethods.retrieve(sessionOrIntent.payment_method);
          if (pm && pm.billing_details) {
            if (!customerName) customerName = pm.billing_details.name || '';
            if (!customerPhone) customerPhone = pm.billing_details.phone || '';
            if (!customerEmail) customerEmail = pm.billing_details.email || '';
          }
        } catch (err) {
          console.error('Error fetching payment method:', err.message);
        }
      }

      if (userId) {
        try {
          const user = await User.findById(userId);
          if (user) {
            if (!customerEmail) customerEmail = user.email;
            if (!customerName) customerName = user.name;
          }
        } catch (err) {
          console.error('Error fetching user:', err.message);
        }
      }
      
      if (!customerEmail) customerEmail = 'no-email-provided@stripe.com';

      const newOrder = new Order({
        userId: userId || null,
        orderId: orderId || `ORD-${Date.now()}`,
        stripeSessionId: sessionOrIntent.id,
        customerEmail,
        customerName,
        items: items,
        totalAmount,
        currency,
        paymentStatus: 'paid',
        shippingAddress
      });

      await newOrder.save();
      console.log('Order created for:', sessionOrIntent.id);

      // Send emails
      const formatAmount = (amount) => `$${(amount / 100).toFixed(2)}`;
      
      let orderItemsHTML = '<ul>';
      for (let item of items) {
        const prod = await Product.findOne({ id: item.productId });
        const pName = prod ? prod.name : `Product ID: ${item.productId}`;
        orderItemsHTML += `<li>${item.quantity}x ${pName}</li>`;
      }
      orderItemsHTML += '</ul>';

      const customerMailOptions = {
        from: `"Victoria Diagnostic Supplies" <${process.env.SMTP_USER}>`,
        to: customerEmail,
        subject: `Order Confirmation - ${newOrder.orderId}`,
        html: `
          <h2>Thank you for your order!</h2>
          <p>Hi ${customerName || 'Customer'},</p>
          <p>We've received your order <strong>${newOrder.orderId}</strong> and are preparing it now.</p>
          <p><strong>Total Amount:</strong> ${formatAmount(totalAmount)}</p>
          <p>Thanks for shopping with us!</p>
        `,
      };

      const adminMailOptions = {
        from: `"Victoria Diagnostic Supplies System" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Order Received - ${newOrder.orderId}`,
        html: `
          <h2>New Order Alert</h2>
          <p>A new order has been placed on the store.</p>
          <ul>
            <li><strong>Order ID:</strong> ${newOrder.orderId}</li>
            <li><strong>Customer Name:</strong> ${customerName || 'N/A'}</li>
            <li><strong>Customer Email:</strong> ${customerEmail}</li>
            <li><strong>Customer Mobile:</strong> ${customerPhone || 'N/A'}</li>
            <li><strong>Total Amount:</strong> ${formatAmount(totalAmount)}</li>
          </ul>
          <h3>Order Items:</h3>
          ${orderItemsHTML}
          <p>Check the admin dashboard for full details.</p>
        `,
      };

      try {
        await transporter.sendMail(customerMailOptions);
        console.log('Customer confirmation email sent.');
        await transporter.sendMail(adminMailOptions);
        console.log('Admin notification email sent.');
      } catch (emailError) {
        console.error('Error sending confirmation emails:', emailError);
      }

    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  res.send();
});

// Middleware
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'placeholder');

app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Missing Google credential token' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID || 'placeholder'
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Invalid Google payload' });
    }

    const { email, name } = payload;
    const displayName = name || email.split('@')[0] || 'Google User';

    let user = await User.findOne({ email });
    if (!user) {
      // Create user if they don't exist
      // Give a random secure password since they use Google to login
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = new User({ name: displayName, email, password: hashedPassword });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Google auth error:', err.message || err);
    res.status(401).json({ error: 'Invalid Google token: ' + (err.message || 'Verification failed') });
  }
});

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    const { items, productId, quantity, userId } = req.body;
    
    let line_items = [];
    let cartItemsMeta = [];

    if (items && items.length > 0) {
      for (let item of items) {
        const product = await Product.findOne({ id: item.productId });
        if (product) {
          line_items.push({
            price_data: {
              currency: 'aud',
              product_data: {
                name: product.name,
                images: product.image && product.image.startsWith('http') ? [product.image] : [],
              },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: item.quantity,
          });
          cartItemsMeta.push({ productId: product.id, quantity: item.quantity });
        }
      }
    } else if (productId) {
      const product = await Product.findOne({ id: productId });
      if (!product) return res.status(404).json({ error: 'Product not found' });
      line_items.push({
        price_data: {
          currency: 'aud',
          product_data: {
            name: product.name,
            images: product.image && product.image.startsWith('http') ? [product.image] : [],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: quantity || 1,
      });
      cartItemsMeta.push({ productId: product.id, quantity: quantity || 1 });
    }

    if (line_items.length === 0) {
      return res.status(400).json({ error: 'No valid products in cart' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        cartItems: JSON.stringify(cartItemsMeta),
        userId: userId || ''
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AU', 'US', 'NZ', 'GB'],
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/checkout/intent', authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;
    let cartItemsMeta = [];

    for (let item of items) {
      const product = await Product.findOne({ id: item.productId });
      if (product) {
        totalAmount += Math.round(product.price * 100) * item.quantity;
        cartItemsMeta.push({ productId: product.id, quantity: item.quantity });
      }
    }

    if (totalAmount === 0) {
      return res.status(400).json({ error: 'No valid products in cart' });
    }

    const orderId = `ORD-${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'aud',
      metadata: {
        cartItems: JSON.stringify(cartItemsMeta),
        userId: req.userId,
        orderId
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret, orderId });
  } catch (err) {
    console.error('Stripe intent error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
