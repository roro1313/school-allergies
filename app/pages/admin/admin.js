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

let modalCreateUser = document.getElementById("modal-detail-create-user");

function openCreateUserModal() {
  modalCreateUser.style.display = "block";
  console.log("modal abierto");
}

function closeModal() {
  modalCreateUser.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalCreateUser) {
    modal.style.display = "none";
  }
};

// MODAL CREAR ESTUDIANTE

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

let modalCreateStudent = document.getElementById("modal-detail-create-student");

function openCreateStudentModal() {
modalCreateStudent.style.display = "block";
console.log("modal abierto");
}

function closeModal() {
modalCreateStudent.style.display = "none";
}

window.onclick = function (event) {
if (event.target == modalCreateStudent) {
  modal.style.display = "none";
}
};




// Aquí tienes que meter el fetch para crear estudiantes que me has pasado en la captura de pantalla

async function registerUser(username, password) {
  const formData = { username, password };

  try {
      const response = await fetch("https://school-allergies.onrender.com/students/new-student", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
          console.log("Usuario registrado correctamente:", data);
          // Redirige al usuario a la página de login.html
          window.location.href = "../login.html";
      } else {
          console.log("Error al registrar el usuario:", data);
          // Aquí puedes manejar errores de registro
      }
  } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Aquí puedes manejar errores de red u otros errores inesperados
  }
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
