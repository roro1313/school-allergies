async function searchStudents() {
    const searchValue = document.getElementById("searchInput").value;
  
    try {
      const response = await fetch("http://localhost:3003/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: searchValue })
      });
  
      const data = await response.json();
  
      if (response.error === false) {
        displayStudents(data.response);
      } else {
        alert(data.response); // Mostrar mensaje de error si la búsqueda falla
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred. Please try again later."); // Mostrar mensaje de error genérico
    }
  }
  
  function displayStudents(students) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Limpiar filas existentes antes de mostrar nuevos resultados
  
    students.map(student => {
      const row = `<tr>
                    <td>${student.studentName}</td>
                    <td>${student.studentSurname}</td>
                    <td>${student.allergies.join(", ")}</td>
                  </tr>`;
      tableBody.innerHTML += row; // Agregar fila a la tabla
    });
  }
  