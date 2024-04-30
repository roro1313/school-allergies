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

async function registerStudent(username, password) {
  const formData = { username, password }; // Faltan datos, no se va a crear así: studentName,studentSurname,studentBirth,studentGrade

  try {
      const response = await fetch("https://school-allergies.onrender.com/students/new-student", { //Estás llamando a new-student, esta llamada no es la de crear usuarios
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Usertype": usertype
          },
          body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
          console.log("Usuario registrado correctamente:", data);
          window.location.href = "../login.html"; //esto no funciona y no es necesario, quitalo
      } else {
          console.log("Error al registrar el usuario:", data);
      }
  } catch (error) {
      console.error("Error al registrar el usuario:", error);
  }
}

function registerUser () {
  /* Aquí sí que va el fetch para crear usuarios, pero antes de hacer esto tienes que arreglar el detail,
  hacer que registerStudent funcione y hacer que funcione la creación de crisis y la creación de alergias */
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

function redirectToDetail(userId) {
window.location.href = `../detail/detail.html?userId=${userId}`;
}
