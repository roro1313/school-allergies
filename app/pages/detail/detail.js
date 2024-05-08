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

const userId = localStorage.getItem("userId");
const urlParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", function () {
  // When the page is loaded, call studentDetail() to get all student information
  studentDetail();
});

// Calling endpoint with userId from url param
const token = localStorage.getItem("token");
const usertype = localStorage.getItem("usertype");

async function studentDetail() {
  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({ userId }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Show student info in sidebar
      const studentInfo = document.getElementById("studentInfo");
      studentInfo.innerHTML = `
      <p class="info-label">Nombre:</p>
      <p class="info-detail">${data.response[0].studentName}</p>
      <p class="info-label">Apellido:</p>
      <p class="info-detail">${data.response[0].studentSurname}</p>
      <p class="info-label">Fecha de nacimiento:</p>
      <p class="info-detail">${data.response[0].studentBirth}</p>
      <p class="info-label">Curso:</p>
      <p class="info-detail">${data.response[0].studentGrade}</p>
      `;
      // Store allergies to show them in a select
      localStorage.setItem(
        "select",
        data.response[0].allergies.map((allergy) => allergy.allergy)
      );
      // Show tables with allergies info
      displayTables(data.response);
    } else {
      console.log(data.response); // Show error message if search fails
      const errorMessage = document.getElementById("errorMessage");
      errorMessage.innerText = "Error: " + data.response;
    }
  } catch (error) {
    console.error(error);
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "An error occurred. Please try again later.";
  }
}

function displayTables(students) {
  const usertype = localStorage.getItem("usertype");
  const tableContainer = document.getElementById("tableInfoContainer");
  tableContainer.innerHTML = "";

  students.forEach((student) => {
    // For each allergy print a table with allergy detail
    const tableHTML = `
        <h3>Estudiante: ${student.studentName} ${student.studentSurname}</h3>
        ${student.allergies
          .map(
            (allergy) => `
            <table>
              <thead>
                <tr>
                  <th>Alergia: ${allergy.allergy}</th>
                  <th colspan="2">Medicación: ${allergy.medication}</th>
                  ${usertype === "admin" ? 
                    `<th style="text-align:center;><button class="action-button" onclick="deleteAllergy('${allergy.allergy}')">❌</button></th>`: ``}
                </tr>
              </thead>
            <thead>
              <tr>
                <th>Crisis</th>
                <th>Fecha</th>
                <th colspan="2">Información</th>
              </tr>
            </thead>
            <tbody>
              ${allergy.crisis.length === 0
                  ? `<tr><td colspan="3">Esta alergia no tiene registradas crisis</td>${
                      usertype === "admin" ? "<td></td>" : ""
                    }</tr>`
                  : allergy.crisis.map((crisis) => 
                    `<tr>
                        <td>${crisis.type}</td>
                        <td>${crisis.timestamp}</td>
                        <td>${crisis.information}</td>
                        ${
                          usertype === "admin" &&
                          `<td style="text-align:center;"><button class="action-button" onclick="deleteCrisis('${student.username}','${allergy.allergy}','${crisis.type}')">🗑️</button></td>`
                        }
                      </tr>`).join("")}
            </tbody>
          </table>
        `
          )
          .join("")}
      `;
    const tableElement = document.createElement("div");
    tableElement.innerHTML = tableHTML;
    tableContainer.appendChild(tableElement);
  });
}
