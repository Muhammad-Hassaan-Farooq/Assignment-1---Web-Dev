jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  var token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    token = token.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
module.exports = verifyAuth;
