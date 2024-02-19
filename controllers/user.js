const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { name, email, password, admin } = req.body;

  //Password validation
  if (password.length < 8) {
    return res
      .status(200)
      .json({ msg: "Password must be at least 8 characters" });
  }
  if (!/[A-Z]/.test(password)) {
    return res
      .status(200)
      .json({ msg: "Password must contain at least one uppercase letter" });
  }
  if (name.length < 3) {
    return res.status(200).json({ msg: "Name must be at least 3 characters" });
  }
  if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    return res.status(200).json({ msg: "Invalid email" });
  }

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
      admin,
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

    const token = jwt.sign(
      { id: user._id, admin: user.admin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ msg: "User logged in", user: user, token });
  } catch (error) {
    res.status(500).json({ msg: "Error logging in" });
  }
};

module.exports = { createUser, findUsers, loginUser };
