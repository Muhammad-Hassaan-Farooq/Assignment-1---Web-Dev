const Task = require("../models/task");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getTasks = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const tasks = await Task.find({ user: user.id });
    res.status(200).send({ msg: "success", data: tasks });
  } catch (error) {
    res.status(500).send({ msg: "Error getting tasks" });
  }
};

const createTask = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const user = jwt.verify(token, process.env.JWT_SECRET);
  const userID = user.id;
  const { title, description } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      user: userID,
    });
    return res.status(200).json({ msg: "success", data: task });
  } catch (error) {
    return res.status(500).json({ msg: "Error creating task" });
  }
};

const getTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);

    return res.status(200).json({ msg: "success", data: task });
  } catch (error) {
    return res.status(500).json({ msg: "Error getting task" });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      filter,
      { title, description, completed },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({ msg: "success", data: task });
  } catch (error) {
    return res.status(500).json({ msg: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    return res.status(200).json({ msg: "success", data: task });
  } catch (error) {
    return res.status(500).json({ msg: "Error deleting task" });
  }
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
