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

let modalCreate = document.getElementById("modal-detail-create-user");

function openCreateUserModal() {
  modalCreate.style.display = "block";
  console.log("modal abierto");
}

function closeModal() {
  modalCreate.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalCreate) {
    modal.style.display = "none";
  }
};

// Aquí tienes que meter el fetch para crear usuarios que me has pasado en la captura de pantalla
