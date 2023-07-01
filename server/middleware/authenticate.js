const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken; // Use req.cookies instead of req.cookie
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);
    const rootUser = await User.findOne({ email: verify.email, "tokens.token": token });

    if (!rootUser) {
      throw new Error('User not found');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
    console.log(err);
  }
};

module.exports = Authenticate;
