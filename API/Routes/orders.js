const express = require('express');
const router = express.Router();
const checkAuth = require('../Middleware/check-auth');

const OrdersController = require('../controllers/orders');

//routing different request types
router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_new);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.delete_order);

module.exports = router;