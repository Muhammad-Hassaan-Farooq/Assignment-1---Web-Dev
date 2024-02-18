const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./Database/connectDB");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const verifyAuth = require("./middleware/verifyAuth");
const verifyAccess = require("./middleware/verifyAccess");

app.use(express.json());

// Home route

//Auth routes
app.use("/auth", authRoutes);
app.use(verifyAuth);
app.use("/task/:id", verifyAccess);
app.use("/task", taskRoutes);

(async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.log("Error connecting to database");
  }
})();
