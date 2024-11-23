const express = require("express");
const router = express.Router();

const {
    newOrder,
    myOrders,
    getSingleOrder
} = require("../controller/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

module.exports = router;