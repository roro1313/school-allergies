// AÑADIR ALERGIAS:
let modalCreateAllergy = document.getElementById("modal-detail-create-allergy");

function openCreateAllergyModal() {
  modalCreateAllergy.style.display = "block";
}

function closeModalAllergies() {
  modalCreateAllergy.style.display = "none";
}

function createAllergy() {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const userId = localStorage.getItem("userId");
  const allergy = document.getElementById("alergia").value;
  const medication = document.getElementById("medication").value;

  if (!allergy || !medication ) {
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
    body: JSON.stringify({ userId, allergy, medication }),
  };

  fetch("https://school-allergies.onrender.com/students/new-allergy", options)
    .then((response) => {
      const userFeedback = document.getElementById("userFeedback");
      if (response.ok) {
        userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Se ha añadido la alergia correctamente.</p></div>`;
        closeModalAllergies();
        setTimeout(() => {
          userFeedback.innerHTML = "";
          window.location.reload();
      }, 1500);
      } else {
        userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Ha habido un error añadiendo la alergia</p></div>`;
        setTimeout(() => {
          userFeedback.innerHTML = "";
      }, 1500);
      }
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
      userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Intente añadir la alergia más tarde</p></div>`;
    });
}

async function deleteAllergy(allergy) {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/students/delete-allergy",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({
          userId,
          allergy,
        }),
      }
    );

    const data = await response.json();
    const userFeedback = document.getElementById("userFeedback");

    if (response.ok) {
      console.log("Alergiaa borrada correctamente:", data);
      userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Alergia borrada correctamente.</p></div>`;
      setTimeout(() => {
        userFeedback.innerHTML = "";
        window.location.reload();
      }, 1500);
    } else {
      console.log("Error al borrar la alergia:", data);
      userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al borrar alergia.</p></div>`;
    }
  } catch (error) {
    console.error("Error al borrar la alergia:", error);
  }
}