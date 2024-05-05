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
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const userId = localStorage.getItem("userId");
  const allergy = document.getElementById("alergia").value;
  const medication = document.getElementById("medication").value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Usertype: usertype,
    },
    body: JSON.stringify({ userId, allergy, medication }),
  };

  // Realizar la solicitud fetch
  fetch("https://school-allergies.onrender.com/students/new-allergy", options)
    .then((response) => {
      if (response.ok) {
        // Si la respuesta es exitosa, mostrar mensaje de éxito
        alert("Se ha añadido la alergia correctamente.");
        closeModalAllergies();
        window.location.reload();
      } else {
        // Si hay un error, mostrar mensaje de error
        alert("Ha ocurrido un error al añadir la alergia.");
      }
    })
    .catch((error) => {
      // Capturar errores de red u otros errores
      console.error("Error al realizar la solicitud:", error);
      alert("Ha ocurrido un error al añadir la alergia.");
    });
}