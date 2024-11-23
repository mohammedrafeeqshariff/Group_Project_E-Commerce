const express = require("express");
const {
    newProduct,
    getProducts,
    getSingleProducts
} = require("../controller/productController");

const router = express.Router();

router
    .route("/admin/products/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProducts);

module.exports = router;