async function login() {
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
            localStorage.setItem("token", data.token);
            document.getElementById("errorMessage").innerText = data.message;
            setTimeout(() => {
                window.location.href = "file:///C:/Users/Rocío/Desktop/school-allergies/app/pages/search/search.html";
            }, 1000);
        } else {
            document.getElementById("errorMessage").innerText = data.message;
        }
    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").innerText = "An error occurred. Please try again later.";
    }
}
