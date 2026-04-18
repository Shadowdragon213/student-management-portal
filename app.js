const BASE_URL = "https://student-management-portal4444.onrender.com";

// 🔐 Logout
function logout() {
  alert("Logged out successfully");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ➕ ADD STUDENT
async function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value.toUpperCase();
  const marks = document.getElementById("marks").value;
  const grade = document.getElementById("grade").value;
  const msg = document.getElementById("msg");

  msg.innerText = "";

  if (!name || !age || !course || !marks || !grade) {
    msg.innerText = "Fill all fields";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ name, age, course, marks, grade })
    });

    if (!res.ok) {
      const text = await res.text();
      msg.innerText = text || "Failed to add student";
      return;
    }

    msg.innerText = "Student added successfully";

    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("grade").value = "";

    viewStudents();

  } catch (err) {
    console.log(err);
    msg.innerText = "Server error";
  }
}

// 📄 VIEW STUDENTS (FINAL UI VERSION)
window.viewStudents = async function () {
  const output = document.getElementById("output");
  output.innerHTML = "";

  try {
    const res = await fetch(`${BASE_URL}/students`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    if (!res.ok) {
      output.innerHTML = "Failed to load students";
      return;
    }

    const students = await res.json();

    students.forEach(s => {
      output.innerHTML += `
        <div class="card">
          <div class="card-header">
            <span class="student-name">${s.name}</span>
            <span class="student-grade">${s.grade}</span>
          </div>

          <div class="card-body">
            <p>🎓 Course: ${s.course}</p>
            <p>📊 Marks: ${s.marks}</p>
            <p>🎂 Age: ${s.age}</p>
            <p style="font-size:10px; opacity:0.6;">ID: ${s._id}</p>
          </div>

          <div class="card-actions">
            <button onclick="fillForm('${s._id}','${s.name}','${s.age}','${s.course}','${s.marks}','${s.grade}')">
              Select
            </button>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.log(err);
    output.innerHTML = "Server error";
  }
};

// 🎯 AUTO-FILL FORM
function fillForm(id, name, age, course, marks, grade) {
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("course").value = course;
  document.getElementById("marks").value = marks;
  document.getElementById("grade").value = grade;
}

// ❌ DELETE
window.deleteStudent = async function () {
  const id = document.getElementById("id").value;

  if (!id) {
    alert("Select student first");
    return;
  }

  try {
    await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    viewStudents();
  } catch (err) {
    console.log(err);
  }
};

// ✏️ UPDATE
window.updateStudent = async function () {
  const id = document.getElementById("id").value;

  if (!id) {
    alert("Select student first");
    return;
  }

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value;
  const grade = document.getElementById("grade").value;

  try {
    await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ name, age, course, marks, grade })
    });

    viewStudents();
  } catch (err) {
    console.log(err);
  }
};