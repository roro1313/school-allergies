
        let modal = document.getElementById("modal-detail");
        
      
        function openModal(){
            modal.style.display = "block";
            console.log("modal abierto");
        }
        
        function closeModal(){
            modal.style.display = "none";
            console.log("modal cerrado");
        }
        
        
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }


        
        