const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

//get Tasks
router.get("/", getTasks);

//create Task
router.post("/", createTask);

//get one task
router.get("/:id", getTask);

router.post("/update/:id", updateTask);

router.post("/delete/:id", deleteTask);

module.exports = router;
