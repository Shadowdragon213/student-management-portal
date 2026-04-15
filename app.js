// 🌐 CHANGE THIS LATER WHEN DEPLOYED--------------------
const BASE_URL = "http://localhost:500https://student-management-portal-backendstucture.onrender.com0";

// ➕ ADD STUDENT----------------------------------------------------------
async function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value;
  const grade = document.getElementById("grade").value;

  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, age, course, marks, grade })
  });

  const result = await response.text();
  alert(result);

  document.getElementById("id").value = "";
document.getElementById("name").value = "";
document.getElementById("age").value = "";
document.getElementById("course").value = "";
document.getElementById("marks").value = "";
document.getElementById("grade").value = "";

  viewStudents(); // auto refresh
}

// 📄 VIEW STUDENTS (FROM DATABASE)---------------------------------
async function viewStudents() {
  const output = document.getElementById("output");
 output.innerHTML = "<p>Loading students...</p>";

 try {
  const response = await fetch(`${BASE_URL}/students`);

  if (!response.ok) {
    output.innerHTML = "<p>Error loading data</p>";
    return;
  }

  const students = await response.json();

  output.innerHTML = "";

  if (students.length === 0) {
    output.innerHTML = "<p>No students found</p>";
    return;
  }

  students.forEach(s => {
   output.innerHTML += `
  <div style="
    margin:15px;
    padding:15px;
    background:#020617;
    border-radius:12px;
    text-align:center;
    box-shadow:0 0 10px rgba(0,0,0,0.3);
    width: 60%;
  ">
    <p><b>ID:</b> ${s._id}</p>
    <p><b>Name:</b> ${s.name}</p>
    <p><b>Age:</b> ${s.age}</p>
    <p><b>Course:</b> ${s.course}</p>
    <p><b>Marks:</b> ${s.marks}</p>
    <p><b>Grade:</b> ${s.grade}</p>
  </div>
`;
  });

} catch (err) {
  output.innerHTML = "<p>Server not responding</p>";
}
}

// ❌ DELETE STUDENT (NEW - DATABASE)-------------------------
async function deleteStudent() {
 const id = document.getElementById("id").value.trim();
 if (!id) {
  alert("Enter ID");
  return;
}

 await fetch(`${BASE_URL}/delete/${id.trim()}`, {
  method: "DELETE"
});

  alert("Student Deleted");
  viewStudents();
}

// ✏️ Update student---------------------------
async function updateStudent() {
  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value;
  const grade = document.getElementById("grade").value;
  

  const response = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
  ...(name && { name }),
  ...(age && { age }),
  ...(course && { course }),
  ...(marks && { marks }),
  ...(grade && { grade })
})
  });

  const result = await response.json();
  alert("Student updated!");
  document.getElementById("id").value = "";
document.getElementById("name").value = "";
document.getElementById("age").value = "";
document.getElementById("course").value = "";
document.getElementById("marks").value = "";
document.getElementById("grade").value = "";

  viewStudents(); // refresh
}

// Load Student--------------------------------
async function loadStudentById() {
  const id = document.getElementById("id").value.trim();

  if (!id) return;

  const response = await fetch(`${BASE_URL}/students`);
  const students = await response.json();

  const student = students.find(s => s._id === id);

  if (!student) {
    alert("Student not found");
    return;
  }

  document.getElementById("name").value = student.name || "";
  document.getElementById("age").value = student.age || "";
  document.getElementById("course").value = student.course || "";
  document.getElementById("marks").value = student.marks || "";
  document.getElementById("grade").value = student.grade || "";
}
