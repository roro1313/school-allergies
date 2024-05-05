// AÑADIR CRISIS:
let modalCreateCrisis = document.getElementById("modal-detail-create-crisis");

function openCreateCrisisModal() {
  modalCreateCrisis.style.display = "block";

  const select = localStorage.getItem("select");
  const allergies = select.split(",");
  const selectAllergyElement = document.getElementById("allergy");
  allergies.forEach((allergy) => {
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

  if (!type || !timestamp || !information || !allergy) {
    document.getElementById("errorForm").innerHTML = `<div style="background:#d46363;padding:3px;"><p>Por favor, complete todos los campos.</p></div>`;
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Usertype: usertype,
    },
    body: JSON.stringify({ userId, type, timestamp, information, allergy }),
  };

  fetch("https://school-allergies.onrender.com/students/new-crisis", options)
    .then((response) => {
      const userFeedback = document.getElementById("userFeedback");
      if (response.ok) {
        userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Se ha añadido la crisis correctamente.</p></div>`;
        closeModalCrisis();
        setTimeout(() => {
          userFeedback.innerHTML = "";
          window.location.reload();
        }, 1500);
      } else {
        userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Ha habido un error añadiendo la crisis</p></div>`;
        setTimeout(() => {
          userFeedback.innerHTML = "";
        }, 1500);
      }
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
      userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Intente añadir la crisis más tarde</p></div>`;
    });
}
