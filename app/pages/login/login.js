const username = 'admin';
const password = 'pass';

const url = 'https://school-allergies.onrender.com/login';

const data = {
  username: username,
  password: password
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

fetch(urlLogin, options)
  .then(response => {
    if (!response.error===false)  {
      console.log('Inicio de sesión exitoso');
      // Realizar acciones adicionales después de iniciar sesión correctamente
    } else {
      console.error('Error en la solicitud de inicio de sesión');
    }
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });