const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createUser, findUsers, loginUser } = require("../controllers/user");

router.post("/login", loginUser);

router.post("/signup", createUser);

router.get("/users", findUsers);

module.exports = router;
