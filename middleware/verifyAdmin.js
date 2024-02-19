const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user.admin) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  next();
};

module.exports = verifyAdmin;
