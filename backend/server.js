const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.static(__dirname));

const SECRET_KEY = "mysecret123";

// ✅ VERIFY TOKEN
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.send("Access Denied");

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch {
    res.send("Invalid Token");
  }
}

// ✅ MONGODB
mongoose.connect("mongodb://admin:ares123@ac-4mrpl32-shard-00-00.vpti9v8.mongodb.net:27017,ac-4mrpl32-shard-00-01.vpti9v8.mongodb.net:27017,ac-4mrpl32-shard-00-02.vpti9v8.mongodb.net:27017/studentDB?ssl=true&replicaSet=atlas-62hsbc-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ USER
const User = mongoose.model("User", {
  email: String,
  password: String
});

// ✅ SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.send("User exists");

  const hashed = await bcrypt.hash(password, 10);
  await new User({ email, password: hashed }).save();

  res.send("success");
});

// ✅ LOGIN (FIXED)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("fail");

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ email: user.email }, SECRET_KEY);
    return res.json({ token }); // 🔥 IMPORTANT
  } else {
    return res.send("fail");
  }
});

// ✅ STUDENT
const Student = mongoose.model("Student", {
  name: String,
  age: Number,
  course: String,
  marks: Number,
  grade: String
});

// ADD
app.post("/add", verifyToken, async (req, res) => {
  await new Student(req.body).save();
  res.send("Student added");
});

// GET
app.get("/students", verifyToken, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// DELETE
app.delete("/delete/:id", verifyToken, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// UPDATE
app.put("/update/:id", verifyToken, async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// 🚀 PORT FIX (CRITICAL FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});