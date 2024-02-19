const User = require("../models/user");
const Task = require("../models/task");

const getUsers = async (req, res) => {
  const users = await User.find();
  console.log("user api");
  res.status(200).send({ msg: "success", data: users });
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(200).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", {
      password: 0,
      __v: 0,
    });
    res.status(200).send({ msg: "success", data: tasks });
  } catch (error) {
    res.status(500).json({ msg: "Error getting tasks" });
  }
};

module.exports = { getUsers, deleteUser, getTasks };
