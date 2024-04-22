const username = 'admin';
const password = 'pass';

const urlLogin = 'https://school-allergies.onrender.com/login';

const opcionesFetch = {
    method: 'POST', // Método HTTP POST para enviar datos sensibles
    headers: {
      'Content-Type': 'application/json' // Especifica que los datos se envían en formato JSON
    },
    body: JSON.stringify(datosUsuario) // Convierte los datos del usuario a formato JSON
  };
  
  // Realiza la solicitud fetch
  fetch(urlLogin, opcionesFetch)
    .then(response => {
      // Maneja la respuesta de la solicitud
      if (!response.error===false) {
        console.log('Inicio de sesión exitoso');
      } else {
        throw new Error('Error en la solicitud de inicio de sesión');
      }
    })
    .catch(error => {
      // Captura cualquier error que ocurra durante la solicitud
      console.error('Error:', error);
    });




