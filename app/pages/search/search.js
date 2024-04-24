// Función para buscar información sobre un alumno
function buscarAlumno(nombreAlumno) {
  fetch('/ruta/hacia/tu/api/alumnos', {
      method: 'POST', // o 'GET' según sea necesario
      headers: {
          'Content-Type': 'application/json'
          // Puedes añadir más headers si es necesario
      },
      body: JSON.stringify({ nombre: nombreAlumno })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('La solicitud no se pudo completar.');
      }
      return response.json();
  })
  .then(data => {
      // Hacer algo con la información del alumno
      console.log(data);
      // Por ejemplo, mostrar la información en algún elemento HTML
      mostrarInformacionAlumno(data);
  })
  .catch(error => {
      console.error('Error al buscar el alumno:', error);
      // Manejar el error de alguna manera, como mostrar un mensaje al usuario
  });
}

// Función para mostrar la información del alumno en la página
function mostrarInformacionAlumno(alumno) {
  // Aquí puedes modificar el DOM para mostrar la información del alumno
  // Por ejemplo:
  document.getElementById('nombre').textContent = alumno.nombre;
  document.getElementById('edad').textContent = alumno.edad;
  document.getElementById('curso').textContent = alumno.curso;
  // Añade más líneas según la estructura de tu página y los datos que quieras mostrar
}

// Ejemplo de cómo llamar a la función buscarAlumno al introducir el nombre del alumno en algún campo de entrada
const nombreInput = document.getElementById('nombreAlumnoInput'); // Suponiendo que tengas un campo de entrada con el ID 'nombreAlumnoInput'
const botonBuscar = document.getElementById('botonEnviar'); // Suponiendo que tengas un botón con el ID 'botonBuscar'

botonEnviar.addEventListener('click', () => {
  const nombreAlumno = nombreInput.value;
  if (nombreAlumno) {
      buscarAlumno(nombreAlumno);
  } else {
      // Manejar el caso en que el campo de entrada esté vacío
  }
});