// MODAL CREAR USUARIO

let modalCreateUser = document.getElementById("modal-detail-create-user");

function openCreateUserModal() {
  modalCreateUser.style.display = "block";

  console.log("modal abierto");
}

function closeModalUser() {
  modalCreateUser.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalCreateUser) {
    modal.style.display = "none";
  }
};

let userType = "user";

function selectUserType(type) {
  userType = type;
  document.getElementById("admin").classList.remove("selected");
  document.getElementById("user").classList.remove("selected");
  document.getElementById(type).classList.add("selected");
}

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