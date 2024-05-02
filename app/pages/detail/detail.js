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
const urlParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", function() {
    // When the page is loaded, call studentDetail() to get all student information
    studentDetail();
});

// Calling endpoint with userId from url param
async function studentDetail() {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(
        "https://school-allergies.onrender.com/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        displayTables(data.response);
      } else {
        console.log(data.response); // Show error message if search fails
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred. Please try again later."); // Show error message
    }
  }

  function displayTables(students) {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";
    
    students.forEach(student => {
        // For each allergy print a table with allergy detail
      const tableHTML = `
        <h1>${student.studentName}'s allergies</h1>
        ${student.allergies.map(allergy => `
          <h3>${allergy.allergy} - ${allergy.medication}</h3>
          <table>
            <thead>
              <tr>
                <th>Crisis</th>
                <th>Fecha</th>
                <th>Información</th>
              </tr>
            </thead>
            <tbody>
              ${allergy.crisis.map(crisis => `
                <tr>
                  <td>${crisis.type}</td>
                  <td>${crisis.timestamp}</td>
                  <td>${crisis.information}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `).join("")}
      `;
      tableContainer.innerHTML += tableHTML;
    });
  }
  
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


function createAllergy(userId, allergy, medication) {
  // Aquí haces un fetch a /students/new-allergy, method POST
  // Coges userId, allergy y medication y lo envías al servidor
  // Muestra un mensaje de si se ha añadido correctamente o ha habido un error
  // Recargas la página para que aparezca la info nueva
  // Objeto con los datos a enviar
  const data = {
    userId: userId,
    allergy: allergy,
    medication: medication
  };

  // Opciones para la solicitud fetch
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  // Realizar la solicitud fetch
  fetch('/students/new-allergy', options)
    .then(response => {
      if (response.ok) {
        // Si la respuesta es exitosa, mostrar mensaje de éxito
        alert('Se ha añadido la alergia correctamente.');
        // Recargar la página para mostrar la nueva información
        location.reload();
      } else {
        // Si hay un error, mostrar mensaje de error
        alert('Ha ocurrido un error al añadir la alergia.');
      }
    })
    .catch(error => {
      // Capturar errores de red u otros errores
      console.error('Error al realizar la solicitud:', error);
      alert('Ha ocurrido un error al añadir la alergia.');
    });
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

function createCrisis(userId, type, timestamp, information) {
  // Aquí haces un fetch a /students/new-crisis, method POST
  // Coges el userId, type, timestamp (que es una fecha) e information y lo envías al servidor
  // Muestra un mensaje de si se ha añadido correctamente o ha habido un error
  // Recargas la página para que aparezca la info nueva
  const data = {
    userId: userId,
    type: type,
    timestamp: timestamp,
    information: information
  };

  // Opciones para la solicitud fetch
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  // Realizar la solicitud fetch
  fetch('/students/new-crisis', options)
    .then(response => {
      if (response.ok) {
        // Si la respuesta es exitosa, mostrar mensaje de éxito
        alert('Se ha añadido la crisis correctamente.');
        // Recargar la página para mostrar la nueva información
        location.reload();
      } else {
        // Si hay un error, mostrar mensaje de error
        alert('Ha ocurrido un error al añadir la crisis.');
      }
    })
    .catch(error => {
      // Capturar errores de red u otros errores
      console.error('Error al realizar la solicitud:', error);
      alert('Ha ocurrido un error al añadir la crisis.');
    });
}