const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


// CREATE ORDER
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
});


// GET ALL ORDERS
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});


// ✅ GET SINGLE ORDER (THIS MUST EXIST)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order' });
  }
});


// CONFIRM PAYMENT
router.put('/confirm/:id', async (req, res) => {
  try {

    const transactionId = 'TXN' + Date.now();

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: 'paid',
        transactionId: transactionId
      },
      { new: true }
    );

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment confirmation failed' });
  }
});


module.exports = router;