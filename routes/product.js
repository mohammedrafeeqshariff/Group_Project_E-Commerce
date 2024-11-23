const express = require("express");
const {
    newProduct,
    getProducts,
    getSingleProducts,
    updateProduct,
    getAdminProducts,
    createProductReview,
    getProductReviews
} = require("../controller/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
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
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);




module.exports = router;