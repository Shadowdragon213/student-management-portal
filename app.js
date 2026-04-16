let searchTimeout;

// 🌐 CHANGE THIS LATER WHEN DEPLOYED--------------------
const BASE_URL = "https://student-management-portal-backendstucture.onrender.com";


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
  const msg = document.getElementById("msg");
    msg.innerText = "Student added!";
    msg.className = "success";
    msg.innerText = "Something went wrong!";
    msg.className = "error";
   setTimeout(() => {
  msg.innerText = "";
  msg.className = "";
}, 2000);

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
output.innerHTML = `
  <div style="font-size:20px; opacity:0.7;">
    ⏳ Loading...
  </div>
`;

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

  students.forEach(student => {
 output.innerHTML += `
  <div class="card" style="
    background:#0f172a;
    padding:20px;
    margin:15px;
    border-radius:12px;
    box-shadow:0 0 15px rgba(0,0,0,0.3);
    width:300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  ">
    <p><b>ID:</b> ${student._id}</p>
    <p><b>Name:</b> ${student.name}</p>
    <p><b>Age:</b> ${student.age}</p>
    <p><b>Course:</b> ${student.course}</p>
    <p><b>Marks:</b> ${student.marks}</p>
    <p><b>Grade:</b> ${student.grade}</p>
  </div>

  #msg.success {
  color: #22c55e; /* green */
}

#msg.error {
  color: #ef4444; /* red */
}
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

  document.getElementById("msg").innerText = "Student deleted!";
  setTimeout(() => {
  document.getElementById("msg").innerText = "";
}, 2000);
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
document.getElementById("msg").innerText = "Student updated!";
setTimeout(() => {
  document.getElementById("msg").innerText = "";
}, 2000);
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
  document.getElementById("msg").innerText = "Student not found!";
    
    setTimeout(() => {      
  document.getElementById("msg").innerText = "";
}, 2000);

    return;
  }

  document.getElementById("name").value = student.name || "";
  document.getElementById("age").value = student.age || "";
  document.getElementById("course").value = student.course || "";
  document.getElementById("marks").value = student.marks || "";
  document.getElementById("grade").value = student.grade || "";
}


// Search Student------------------------------------------------
function searchStudent() {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    const searchValue = document.getElementById("search").value.toLowerCase();

    if (!searchValue) {
      document.getElementById("msg").innerText = "";
      document.getElementById("output").innerHTML = "";
      return;
    }

    const response = await fetch(`${BASE_URL}/students`);
    const students = await response.json();

    const filtered = students.filter(s =>
      s.name.toLowerCase().includes(searchValue)
    );

    const output = document.getElementById("output");
    output.innerHTML = "";

    if (filtered.length === 0) {
      output.innerHTML = "<p>No matching students found</p>";
      return;
    }

    filtered.forEach(student => {
      output.innerHTML += `
        <div class="card" style="
          background:#0f172a;
          padding:20px;
          margin:15px;
          border-radius:12px;
          width:300px;
        ">
          <p><b>Name:</b> ${student.name}</p>
          <p><b>Course:</b> ${student.course}</p>
        </div>
        
      `;
    });

  }, 400); // delay (400ms)
}