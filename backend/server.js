const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//  Connect to MongoDB----------------------
mongoose.connect("mongodb://admin:ares123@ac-4mrpl32-shard-00-00.vpti9v8.mongodb.net:27017,ac-4mrpl32-shard-00-01.vpti9v8.mongodb.net:27017,ac-4mrpl32-shard-00-02.vpti9v8.mongodb.net:27017/studentDB?ssl=true&replicaSet=atlas-62hsbc-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected 🤍"))
  .catch(err => console.log(err));
// 📦 Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,  
  marks: Number,
  grade: String
});

const Student = mongoose.model("Student", studentSchema);

// ➕ Add student-----------------
app.post("/add", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    marks: req.body.marks,
    grade: req.body.grade,
    course: req.body.course
  });

  await student.save();
  res.send("Student added");
});

// ✏️ Update student----------
app.put("/update/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        course: req.body.course,
        marks: req.body.marks,
        grade: req.body.grade
      },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).send("Error updating student");
  }
});

// 📄 Get all students--------------
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Student deleted");
});

// 🚀 Server----------
app.listen(5000, () => {
    console.log("Server running on port 5000");
});