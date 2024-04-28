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

function openCreateUserModal() {
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
