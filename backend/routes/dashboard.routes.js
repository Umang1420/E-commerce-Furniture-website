const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Dashboard Stats
router.get('/stats', async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue
    });

  } catch (err) {
    res.status(500).json({ message: 'Dashboard error' });
  }
});

// Recent Orders
router.get('/recent-orders', async (req, res) => {
  try {

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(recentOrders);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching recent orders' });
  }
});

module.exports = router;