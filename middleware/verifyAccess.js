const jwt = require("jsonwebtoken");
const Task = require("../models/task");

const verifyAccess = async (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];

  const user = jwt.verify(token, process.env.JWT_SECRET);
  const userID = user.id;
  const id = req.params.id;
  console.log(id);
  const task = await Task.findOne({ _id: id });
  console.log(task);
  if (task.user != userID) {
    return res.status(401).json({ msg: "You do not have access to this task" });
  }
  console.log("Access verified");
  next();
};

module.exports = verifyAccess;
