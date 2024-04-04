const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Check if the token starts with "Bearer " and remove it
  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const jwtToken = token.substring(7).trim(); // Remove "Bearer " prefix
  console.log(jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRECT_KEY);
    console.log(isVerified);                        

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
