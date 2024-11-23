const express = require("express");
const {
    newProduct,
    getProducts,
    getSingleProducts,
    updateProduct,
    getAdminProducts
} = require("../controller/productController");

const router = express.Router();

router
    .route("/admin/products/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProducts);

router.route("/admin/products").get(getAdminProducts);
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)

module.exports = router;