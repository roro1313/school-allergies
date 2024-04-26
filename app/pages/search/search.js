async function searchStudents() {
  const searchValue = document.getElementById("searchInput").value;
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
        body: JSON.stringify({ userId: searchValue }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      displayStudents(data.response);
    } else {
      console.log(data.response); // Show error message if search fails
    }
  } catch (error) {
    console.error(error);
    console.error("An error occurred. Please try again later."); // Show error message
  }
}

function displayStudents(students) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "search.html"; // Clean table before print new results
  // Pick student info and print them in a table row
  // Pick all allergies and join them in a cell
  students.map((student) => {
    const onClick = `onclick="redirectToDetail('${student.userId}')"`;
    const row = `<tr ${onClick}>
                    <td>${student.studentName}</td>
                    <td>${student.studentSurname}</td>
                    <td>${student.allergies
                      .map((allergyObj) => allergyObj.allergy)
                      .join(", ")}</td>
                  </tr>`;
    tableBody.innerHTML += row; // Add table row
  });
}

function redirectToDetail(userId) {
  window.location.href = `../detail/detail.html?userId=${userId}`;
}


document.getElementById('register-form').addEventListener('submit', function(event) {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var usernameError = document.getElementById('username-error');
    var passwordError = document.getElementById('password-error');
    var isValid = true;

    // Validar el nombre de usuario
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Por favor ingrese un nombre de usuario';
        isValid = false;
    } else {
        usernameError.textContent = '';
    }

    // Validar la contraseña
    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Por favor ingrese una contraseña';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }
});