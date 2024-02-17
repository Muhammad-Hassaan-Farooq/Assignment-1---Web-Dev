const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(200).json({ msg: "User already exists" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error checking user" });
  }

  try {
    const user = User.create({
      name,
      email,
      password: await bcrypt.hash(password, 5),
    });
    res.status(200).json({ msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error creating user" });
  }
};

const findUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send({ msg: "success", data: users });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    const pwdcheck = await bcrypt.compare(password, user.password);
    if (!pwdcheck) {
      return res.status(200).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "User logged in", user: user, token });
  } catch (error) {
    res.status(500).json({ msg: "Error logging in" });
  }
};

module.exports = { createUser, findUsers, loginUser };
