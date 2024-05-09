let userType = "user";

function selectUserType(type) {
  userType = type;
  document.getElementById("admin").classList.remove("selected");
  document.getElementById("user").classList.remove("selected");
  document.getElementById(type).classList.add("selected");
}

// MODAL CREAR USUARIO

let modalCreateUser = document.getElementById("modal-detail-create-user");

function openCreateUserModal() {
  modalCreateUser.style.display = "block";
}

function closeModalUser() {
  modalCreateUser.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalCreateUser) {
    modal.style.display = "none";
  }
};

// MODAL EDITAR USUARIO

let modalEditUser = document.getElementById("modal-detail-edit-user");

function openEditUserModal(username, password, usertype) {
  modalEditUser.style.display = "block";
  setTimeout(() => {
    document.getElementById("usernameEdit").value = username;
    document.getElementById("passwordEdit").value = password;
    userType = usertype;
    document
      .getElementById("buttonEdit")
      .addEventListener("click", () => editUser(username));
  }, 100);
}

function closeModalEditUser() {
  modalEditUser.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalEditUser) {
    modal.style.display = "none";
  }
};

async function registerUser() {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/users/new-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({
          username,
          password,
          usertype: userType,
        }),
      }
    );

    const data = await response.json();
    const userFeedback = document.getElementById("userFeedback");

    if (response.ok) {
      console.log("Usuario registrado correctamente:", data);
      userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Usuario registrado correctamente.</p></div>`;
      setTimeout(() => {
        userFeedback.innerHTML = "";
        closeModalUser();
        window.location.reload();
      }, 1500);
    } else {
      console.log("Error al registrar el usuario:", data);
      if (data.error && data.message === "Username already exists") {
        userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>El nombre de usuario ya existe.</p></div>`;
      } else {
        userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al registrar usuario.</p></div>`;
      }
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}

async function editUser(username) {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const usertypeEdited = localStorage.getItem("usertype");
  const password = document.getElementById("passwordEdit").value;


  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/users/edit-user",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({
          username: username,
          password,
          usertype: usertypeEdited,
        }),
      }
    );

    const data = await response.json();
    const userFeedback = document.getElementById("editFeedback");

    if (response.ok) {
      console.log("Usuario editado correctamente:", data);
      userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Usuario editado correctamente.</p></div>`;
      setTimeout(() => {
        userFeedback.innerHTML = "";
        closeModalEditUser();
        window.location.reload();
      }, 1500);
    } else {
      console.log("Error al editar el usuario:", data);
      userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al editar usuario.</p></div>`;
    }
  } catch (error) {
    console.error("Error al editar el usuario:", error);
  }
}

async function deleteUser(username) {
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");

  try {
    const response = await fetch(
      "https://school-allergies.onrender.com/users/delete-user",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Usertype: usertype,
        },
        body: JSON.stringify({
          username: username,
        }),
      }
    );

    const data = await response.json();
    const userFeedback = document.getElementById("deleteFeedback");


    if (response.ok) {
      console.log("Usuario borrado correctamente:", data);
      userFeedback.innerHTML = `<div style="background:#90ee90;padding:5px;"><p>Usuario borrado correctamente.</p></div>`;
      setTimeout(() => {
        userFeedback.innerHTML = "";
        window.location.reload();
      }, 1500); 
    } else {
      console.log("Error al borrar el usuario:", data);
      userFeedback.innerHTML = `<div style="background:#d46363;padding:5px;"><p>Error al borrar usuario.</p></div>`;
    }
  } catch (error) {
    console.error("Error al borrar el usuario:", error);
  }
}