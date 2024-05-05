async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://school-allergies.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.error) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usertype", data.usertype);
            document.getElementById("errorMessage").innerText = data.message;
            setTimeout(() => {
                // Redirect to a different page if admin is logged
                if (data.usertype === "admin"){
                    window.location.href = "../admin/admin.html";
                } else {
                    window.location.href = "../search/search.html";
                }
                
            }, 1000);
        } else {
            document.getElementById("errorMessage").innerText = data.message;
        }
    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").innerText = "An error occurred. Please try again later.";
    }
}
