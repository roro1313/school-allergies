// MODAL EDITAR ESTUDIANTE
let modalEditStudent = document.getElementById("modal-detail-edit-student");

function openEditStudentModal(name, surname, grade, birth, userId) {
  modalEditStudent.style.display = "block";

  document.getElementById("studentNameEdit").value = name;
  document.getElementById("studentSurnameEdit").value = surname;
  document.getElementById("studentGradeEdit").value = grade;
  document.getElementById("studentBirthEdit").value = birth;
  document.getElementById("buttonEdit").setAttribute("data-userId", userId);
}

function closeModalEditStudent() {
  modalEditStudent.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalEditStudent) {
    modal.style.display = "none";
  }
};

async function editStudent() {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const studentName = document.getElementById("studentNameEdit").value;
  const studentSurname = document.getElementById("studentSurnameEdit").value;
  const studentGrade = document.getElementById("studentGradeEdit").value;
  const studentBirth = document.getElementById("studentBirthEdit").value;
  const userId = document.getElementById("buttonEdit").getAttribute("data-userId");

  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/students/edit-student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({
          userId: userId,
          studentName,
          studentSurname,
          studentGrade,
          studentBirth,
        }),
      }
    );

    const data = await response.json();
    const userFeedback = document.getElementById("editFeedback");

    if (response.ok) {
      console.log("Estudiante editado correctamente:", data);
      userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Estudiante editado correctamente.</p></div>`;
      setTimeout(() => {
        userFeedback.innerHTML = "";
        closeModalEditStudent();
        window.location.reload();
      }, 1500);
    } else {
      console.log("Error al editar el estudiante:", data);
      userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al editar estudiante.</p></div>`;
    }
  } catch (error) {
    console.error("Error al editar el estudiante:", error);
  }
}

// MODAL CREAR ESTUDIANTE

let modalCreateStudent = document.getElementById("modal-detail-create-student");

function openCreateStudentModal() {
  modalCreateStudent.style.display = "block";
  console.log("modal abierto");
}

function closeModalStudent() {
  modalCreateStudent.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalCreateStudent) {
    modal.style.display = "none";
  }
};

async function registerStudent() {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const studentName = document.getElementById("studentName").value;
  const studentSurname = document.getElementById("studentSurname").value;
  const studentGrade = document.getElementById("studentGrade").value;
  const studentBirth = document.getElementById("studentBirth").value;

  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/students/new-student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({
          studentName,
          studentSurname,
          studentGrade,
          studentBirth,
        }),
      }
    );

    const data = await response.json();
    const userFeedback = document.getElementById("userFeedback");

    if (response.ok) {
      console.log("Estudiante registrado correctamente:", data);
      userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Estudiante registrado correctamente.</p></div>`;
      setTimeout(() => {
        userFeedback.innerHTML = "";
        closeModalStudent();
        window.location.reload();
      }, 1500);
    } else {
      console.log("Error al registrar el estudiante:", data);
      userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al registrar estudiante.</p></div>`;
    }
  } catch (error) {
    console.error("Error al registrar el estudiante:", error);
  }
}

// BORRAR ESTUDIANTE

async function deleteStudent(userId) {
    const token = localStorage.getItem("token");
    const usertype = localStorage.getItem("usertype");
  
    try {
      const response = await fetch(
        "https://school-allergies.onrender.com/students/delete-student",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Usertype: usertype,
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
  
      const data = await response.json();
      const userFeedback = document.getElementById("deleteFeedback");
  
      if (response.ok) {
        console.log("Estudiante borrado correctamente:", data);
        userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Estudiante borrado correctamente.</p></div>`;
        setTimeout(() => {
          userFeedback.innerHTML = "";
          window.location.reload();
        }, 1500);
      } else {
        console.log("Error al borrar el estudiante:", data);
        userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al borrar estudiante.</p></div>`;
      }
    } catch (error) {
      console.error("Error al borrar el estudiante:", error);
    }
  }
