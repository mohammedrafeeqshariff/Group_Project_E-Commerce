const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const APIFeatures = require("../utils/apiFeatures");

// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "shopx/products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});


// get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 12;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    // apiFeatures.pagination(resPerPage)
    // products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
    });
});

// get single product => api/v1/product/:id
exports.getSingleProducts = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});


// Admin

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(
                product.images[i].public_id
            );
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "shopx/products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});
