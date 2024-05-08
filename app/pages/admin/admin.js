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

// BÚSQUEDA STUDENTS
async function searchStudents() {
  const searchValue = document.getElementById("searchInput").value;
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");

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
  tableBody.innerHTML = "";
  students.map((student) => {
    const onClick = `onclick="redirectToDetail('${student.userId}')"`;
    const row = 
      `<tr>
        <td ${onClick}>${student.studentName}</td>
        <td ${onClick}>${student.studentSurname}</td>
        <td ${onClick}>${student.allergies
          .map((allergyObj) => allergyObj.allergy)
          .join(", ")}</td>
        <td><button onclick="openEditStudentModal('${student.studentName}', '${student.studentSurname}', '${student.studentGrade}', '${student.studentBirth}', '${student.userId}')">✏️</button></td>
        <td><button onclick="deleteStudent('${student.userId}')">🗑️</button></td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

function redirectToDetail(userId) {
  localStorage.setItem("userId", userId);
  window.location.href = `../detail/detail.html?userId=${userId}`;
}

// BÚSQUEDA USERS
async function searchUsers() {
  const searchValue = document.getElementById("searchUsersInput").value;
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");

  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({ userId: searchValue }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      displayUsers(data.response);
    } else {
      console.log(data.response); // Show error message if search fails
    }
  } catch (error) {
    console.error(error);
    console.error("An error occurred. Please try again later."); // Show error message
  }
}

function displayUsers(users) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  users.map((user) => {
    const row =
      `<tr>
        <td>${user.username}</td>
        <td><button onclick="openEditUserModal('${user.username}', '${user.password}')">✏️</button></td>
        <td><button onclick="deleteUser('${user.username}')">🗑️</button></td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

// CAMBIO SECCION
function showSection(sectionName) {
  const sections = document.querySelectorAll('.main-content > section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  const selectedSection = document.getElementById(`${sectionName}-section`);
  selectedSection.classList.remove('hidden');
}
