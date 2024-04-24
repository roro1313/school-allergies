const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

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
