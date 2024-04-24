document.getElementById('formularioBusqueda').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreAlumno = document.getElementById('nombreAlumno').value;
    buscarAlumno(nombreAlumno);
});

function buscarAlumno(nombreAlumno) {
    fetch('/ruta/hacia/tu/api/alumnos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
        mostrarInformacionAlumno(data);
    })
    .catch(error => {
        console.error('Error al buscar el alumno:', error);
        mostrarError('No se pudo encontrar la información del alumno.');
    });
}

function mostrarInformacionAlumno(alumno) {
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    resultadoBusqueda.innerHTML = `
        <h2>Información del Alumno:</h2>
        <p><strong>Alergia:</strong> ${alumno.alergia}</p>
        <p><strong>Medicación:</strong> ${alumno.medicacion}</p>
        <p><strong>Tipo de Crisis:</strong> ${alumno.tipoCrisis}</p>
        <p><strong>Fecha:</strong> ${alumno.fecha}</p>
        <p><strong>Información:</strong> ${alumno.informacion}</p>
    `;
}

function mostrarError(mensaje) {
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    resultadoBusqueda.innerHTML = `<p>${mensaje}</p>`;
}
</script>
</body>
</html>