function toggleMenu() {
    const speedDial = document.getElementById("speedDial");
    speedDial.classList.toggle("active");
  }
  // Manage clicks outside the plus menu
  window.addEventListener("click", function (event) {
    const speedDial = document.getElementById("speedDial");
    if (!event.target.matches(".plus-menu")) {
      speedDial.classList.remove("active");
    }
  });

// MODAL CREAR ESTUDIANTE

let modalCreateStudent = document.getElementById("modal-detail-create-student");

function openCreateStudentModal() {
modalCreateStudent.style.display = "block";
console.log("modal abierto");
}

function closeModalStudent() {
modalCreateStudent.style.display = "none";
}

window.onclick = function (event) {
if (event.target == modalCreateStudent) {
  modal.style.display = "none";
}
};

// MODAL CREAR USUARIO

let modalCreateUser = document.getElementById("modal-detail-create-user");

function openCreateUserModal() {
modalCreateUser.style.display = "block";
console.log("modal abierto");
}

function closeModalUser() {
modalCreateUser.style.display = "none";
}

window.onclick = function (event) {
if (event.target == modalCreateUser) {
  modal.style.display = "none";
}
};

async function registerStudent() {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const studentName = document.getElementById("studentName").value;
  const studentSurname = document.getElementById("studentSurname").value;
  const studentGrade = document.getElementById("studentGrade").value;
  const studentBirth = document.getElementById("studentBirth").value;

  try {
      const response = await fetch("https://school-allergies.onrender.com/students/new-student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Usertype": usertype
          },
          body: JSON.stringify({studentName, studentSurname, studentGrade, studentBirth})
      });

      const data = await response.json();
      const userFeedback = document.getElementById("userFeedback");
      
      if (response.ok) {
          console.log("Estudiante registrado correctamente:", data);
          userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Estudiante registrado correctamente.</p></div>`;
          setTimeout(() => {
            userFeedback.innerHTML = "";
            closeModalStudent();
          }, 1500);
      } else {
          console.log("Error al registrar el estudiante:", data);
          userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al registrar estudiante.</p></div>`;
      }
  } catch (error) {
      console.error("Error al registrar el estudiante:", error);
  }
}

function registerUser () {
  /* Aquí sí que va el fetch para crear usuarios */
}

function displayStudents(students) {
const tableBody = document.getElementById("tableBody");
tableBody.innerHTML = ""; // Clean table before print new results
// Pick student info and print them in a table row
// Pick all allergies and join them in a cell
students.map((student) => {
  const onClick = `onclick="redirectToDetail('${student.userId}')"`;
  const row = `<tr ${onClick}>
                  <td>${student.studentName}</td>
                  <td>${student.studentSurname}</td>
                  <td>${studen.studenGrade}</td>
                  <td>${student.studentBirth
                    .map((allergyObj) => allergyObj.allergy)
                    .join(", ")}</td>
                </tr>`;
  tableBody.innerHTML += row; // Add table row
});
}
