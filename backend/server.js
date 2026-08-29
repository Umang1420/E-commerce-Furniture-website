const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const dashboardRoutes = require('./routes/dashboard.routes');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

// ✅ Middleware FIRST
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// ✅ Routes AFTER middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contact', contactRoutes);

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('Mongo error:', err));