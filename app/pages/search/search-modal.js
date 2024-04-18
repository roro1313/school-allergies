        // Identificamos el modal y ko guardamos en una variable porque lo vamos a usar muchas veces
        let modal = document.getElementById("modal-detail");
        
        //Hacemos una función para controlar todo lo que queremos hacer cuando se hace click en el botón
        //En este caso, abrimos el modal y ponemos "modal abierto" en consola, para controlar todo
        function openModal(){
            modal.style.display = "block";
            console.log("modal abierto");
        }
        //Ahora igual con el botón de cerrar
        function closeModal(){
            modal.style.display = "none";
            console.log("modal cerrado");
        }
        
        // Con esto controlamos que, cuando el modal esté abierto, si haces click fuera del modal, se cierre
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }