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
      if (response.ok) {
        console.log('Inicio de sesión exitoso');
      } else {
        throw new Error('Error en la solicitud de inicio de sesión');
      }
    })
    .catch(error => {
      // Captura cualquier error que ocurra durante la solicitud
      console.error('Error:', error);
    });





    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
        // Obtiene los valores de los campos del formulario
        const usuario = document.getElementById('username').value;
        const contraseña = document.getElementById('password').value;
    
        // Crea un objeto con los datos del usuario
        const datosUsuario = {
            username: admin,
            password: pass
        };
    
        // URL de la solicitud de inicio de sesión
        const urlLogin = 'https://school-allergies.onrender.com/login';
    
        // Opciones de la solicitud fetch
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
                if (response.ok) {
                    console.log('Inicio de sesión exitoso');
                } else {
                    throw new Error('Error en la solicitud de inicio de sesión');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });