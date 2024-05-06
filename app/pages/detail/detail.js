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
      // Store allergies to show them in a select
      localStorage.setItem("select", data.response[0].allergies.map((allergy) => allergy.allergy))
      // Show tables with allergies info
      displayTables(data.response);
      // Show student info in sidebar
      const studentInfo = document.getElementById("studentInfo");
      studentInfo.innerHTML= `
      <p class="info-label">Nombre:</p>
      <p class="info-detail">${data.response[0].studentName}</p>
      <p class="info-label">Apellido:</p>
      <p class="info-detail">${data.response[0].studentSurname}</p>
      <p class="info-label">Fecha de nacimiento:</p>
      <p class="info-detail">${data.response[0].studentBirth}</p>
      <p class="info-label">Curso:</p>
      <p class="info-detail">${data.response[0].studentGrade}</p>
      `;
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

  students.forEach((student) => {
    // For each allergy print a table with allergy detail
    const tableHTML = `
        <h1>${student.studentName}'s allergies</h1>
        ${student.allergies
          .map(
            (allergy) => `
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
              ${allergy.crisis
                .map(
                  (crisis) => `
                <tr>
                  <td>${crisis.type}</td>
                  <td>${crisis.timestamp}</td>
                  <td>${crisis.information}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `
          )
          .join("")}
      `;
    tableContainer.innerHTML += tableHTML;
  });
}
