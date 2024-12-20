// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  res.status(statusCode).cookie("token", token).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;