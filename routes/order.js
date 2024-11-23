const express = require("express");
const router = express.Router();

const {
    newOrder,
    myOrders,
    getSingleOrder,
    updateOrder,
    allOrders
} = require("../controller/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//admin route section...

router
    .route("/admin/orders/")
    .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)

module.exports = router;