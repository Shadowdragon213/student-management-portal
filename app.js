let searchTimeout;

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

    const data = await res.json();
msg.innerText = data.message;

   document.getElementById("name").value = "";
   document.getElementById("age").value = "";
   document.getElementById("course").value = "";
   document.getElementById("marks").value = "";
   document.getElementById("grade").value = "";

    viewStudents();

  } catch {
    msg.innerText = "Server not responding";
  }
}

// 📄 VIEW STUDENTS
window.viewStudents = async function () {
  const output = document.getElementById("output");

  try {
    const res = await fetch(`${BASE_URL}/students`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

const students = await res.json();

output.innerHTML = ""; 

    students.forEach(s => {
      output.innerHTML += `
        <div class="card">
          <p><b>Name:</b> ${s.name}</p>
          <p><b>Age:</b> ${s.age}</p>
          <p><b>Course:</b> ${s.course}</p>
        </div>
      `;
    });

  } catch {
    output.innerHTML = "Server not responding";
  }
}

// ❌ DELETE
window.deleteStudent = async function () {
  const id = document.getElementById("id").value;

  await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  viewStudents();
}

// ✏️ UPDATE
window.updateStudent = async function () {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;

  await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ name })
  });

  viewStudents();
}