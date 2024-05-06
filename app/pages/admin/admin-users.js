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

function registerUser() {
    /* Aquí sí que va el fetch para crear usuarios */
  }