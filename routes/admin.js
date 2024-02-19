const router = require("express").Router();
const { getUsers, deleteUser, getTasks } = require("../controllers/admin");

router.get("/getUsers", getUsers);
router.post("/deleteUser", deleteUser);
router.get("/getTasks", getTasks);

module.exports = router;
