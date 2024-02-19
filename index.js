const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./Database/connectDB");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const verifyAuth = require("./middleware/verifyAuth");
const adminRoutes = require("./routes/admin");
const verifyAdmin = require("./middleware/verifyAdmin");

app.use(express.json());

// Home route

//Auth routes
app.use("/auth", authRoutes);

//Verify auth middleware
app.use(verifyAuth);

//Task routes
app.use("/task", taskRoutes);

//Verify admin middleware
app.use(verifyAdmin);
//Admin routes
app.use("/admin", adminRoutes);

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
