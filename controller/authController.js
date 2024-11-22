const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "shopx/avatar",
        width: 150,
        crop: "scale",
    });

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url,
        },
    });

    sendToken(user, 200, res);
});