  // Función para desplazamiento suave
  function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutQuad(progress);
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Función para función de aceleración (ease out quadratic)
  function easeOutQuad(t) {
    return t * (2 - t);
  }

  // Asignar el evento de clic a los enlaces de la barra de navegación
  const navLinks = document.querySelectorAll('ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target.getAttribute('href');
      smoothScroll(target, 500); // Cambia la duración según tus preferencias
    });
  });

  // DIVS dinamicos para los proyectos

  const contenedorProyectos = document.getElementById("contenedorProyectos")

  fetch('proyectos.json')
  .then(res => res.json())
  .then(datos => {
     datos.forEach(e => {
      const divProyecto = document.createElement("div")
      divProyecto.className = "divProyecto"     
      divProyecto.innerHTML = 
      `
      <div class="divImgProyectos">
        <img class="imgProyectos" src="${e.img}">
      </div>

    
       <div class="divInfoProyectos">

        <h4 class='h4Nombre'>${e.nombre}</h4>   

        <div class='divLenguajes'> 
          <p class='pLenguaje'>${e.lenguaje1}</p>
          <p class='pLenguaje'>${e.lenguaje2}</p>
          <p class='pLenguaje'>${e.lenguaje3}</p>
          <p class='pLenguaje p${e.id}'>${e.lenguaje4}</p>
        </div>

        </div>
 
      
      `;

      divProyecto.addEventListener("click", function() {
        window.location.href = e.urlGitHub;
      });

      contenedorProyectos.appendChild(divProyecto);
    });
  });
