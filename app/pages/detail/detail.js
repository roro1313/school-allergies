// Menu functionality
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

// ESTE ES EL USERID, lo necesitarás para crear alergias y crisis
const userId = localStorage.getItem("userId");

// MODAL AÑADIR ALERGIAS:
let modalCreateAllergy = document.getElementById("modal-detail-create-allergy");

function openCreateAllergyModal() {
  // Coges modalCreateAllergy y le cambias el display para que se muestre
  modalCreateAllergy.style.display = "block";
}

function closeModalAllergies() {
  // Coges modalCreateAllergy y le cambias el display para que se oculte
  modalCreateAllergy.style.display = "none";
}

function createAllergy() {
  // Aquí haces un fetch a /students/new-allergy, method POST
  // Coges userId, allergy y medication y lo envías al servidor
  // Muestra un mensaje de si se ha añadido correctamente o ha habido un error
  // Recargas la página para que aparezca la info nueva
}

// MODAL AÑADIR CRISIS: 
let modalCreateCrisis = document.getElementById("modal-detail-create-crisis");

function openCreateCrisisModal() {
  // Coges modalCreateAllergy y le cambias el display para que se muestre
  modalCreateCrisis.style.display = "block";
}

function closeModalCrisis() {
  // Coges modalCreateAllergy y le cambias el display para que se oculte
  modalCreateCrisis.style.display = "none";
}

function createCrisis() {
  // Aquí haces un fetch a /students/new-crisis, method POST
  // Coges el userId, type, timestamp (que es una fecha) e information y lo envías al servidor
  // Muestra un mensaje de si se ha añadido correctamente o ha habido un error
  // Recargas la página para que aparezca la info nueva
}
