const express = require("express");
const {
    newProduct,
} = require("../controller/productController");

const router = express.Router();

router
    .route("/admin/products/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

module.exports = router;