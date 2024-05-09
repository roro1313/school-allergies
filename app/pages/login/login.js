async function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (!username || !password) {
      errorMessage.innerHTML = "<p>Completa los campos de usuario y contraseña.</p>";
      return;
    }
  
    try {
      const response = await fetch("https://school-allergies.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (data.error) {
        errorMessage.innerText = data.message;
        usernameInput.value = "";
        passwordInput.value = "";
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usertype", data.usertype);
        errorMessage.innerText = data.message;
        setTimeout(() => {
          if (data.usertype === "admin") {
            window.location.href = "../admin/admin.html";
          } else {
            window.location.href = "../search/search.html";
          }
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      errorMessage.innerText = "Se produjo un error. Por favor, inténtalo de nuevo más tarde.";
    }
  }


