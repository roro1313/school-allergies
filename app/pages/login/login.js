document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3003/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token en el almacenamiento local o de sesión
            localStorage.setItem("token", data.token);
            // Redireccionar a otra página o mostrar un mensaje de éxito
            console.log("Login successful!");
        } else {
            // Mostrar un mensaje de error si la autenticación falla
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
        // Mostrar un mensaje de error genérico si ocurre un error en la solicitud
        alert("An error occurred. Please try again later.");
    }
});
