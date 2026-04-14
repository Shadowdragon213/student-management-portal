let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    // Prevent empty input
    if (!id || !name || !age || !course) {
        alert("Please fill all fields!");
        return;
    }

    let student = { id, name, age, course };
    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));
    alert("Student Added!");
}

function viewStudents() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    if (students.length === 0) {
        output.innerHTML = "<p>No students found</p>";
        return;
    }

    students.forEach(s => {
        output.innerHTML += `
            <div style="margin:10px; padding:10px; background:#020617; border-radius:8px;">
                <b>ID:</b> ${s.id} |
                <b>Name:</b> ${s.name} |
                <b>Age:</b> ${s.age} |
                <b>Course:</b> ${s.course}
            </div>
        `;
    });
}

function deleteStudent() {
    let id = document.getElementById("id").value;

    students = students.filter(s => s.id !== id);
    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Deleted!");
}
