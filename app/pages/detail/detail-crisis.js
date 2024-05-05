// MODAL AÑADIR CRISIS:
let modalCreateCrisis = document.getElementById("modal-detail-create-crisis");

function openCreateCrisisModal() {
  modalCreateCrisis.style.display = "block";

  const select = localStorage.getItem("select");
  const allergies = select.split(",");
  const selectAllergyElement = document.getElementById("allergy");
  allergies.forEach(allergy => {
    const option = document.createElement("option");
    option.text = allergy.trim();
    selectAllergyElement.add(option);
  });
}


function closeModalCrisis() {
  modalCreateCrisis.style.display = "none";
}

function createCrisis() {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const userId = localStorage.getItem("userId");
  const type = document.getElementById("type").value;
  const timestamp = document.getElementById("timestamp").value;
  const information = document.getElementById("information").value;
  const allergy = document.getElementById("allergy").value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Usertype: usertype,
    },
    body: JSON.stringify({ userId, type, timestamp, information, allergy }),
  };

  // Realizar la solicitud fetch
  fetch("https://school-allergies.onrender.com/students/new-crisis", options)
    .then((response) => {
      if (response.ok) {
        // Si la respuesta es exitosa, mostrar mensaje de éxito
        alert("Se ha añadido la crisis correctamente.");
        closeModalCrisis();
        window.location.reload();
      } else {
        // Si hay un error, mostrar mensaje de error
        alert("Ha ocurrido un error al añadir la crisis.");
      }
    })
    .catch((error) => {
      // Capturar errores de red u otros errores
      console.error("Error al realizar la solicitud:", error);
      alert("Ha ocurrido un error al añadir la crisis.");
    });
}