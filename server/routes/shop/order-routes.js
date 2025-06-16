const express = require("express");
// invoice generation
const { generateInvoice } = require("../../controllers/shop/order-controller");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);
// Generate Invoice PDF
router.get("/invoice/:orderId", generateInvoice);

module.exports = router;
