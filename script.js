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
      smoothScroll(target, 1000); // Cambia la duración según tus preferencias
    });
  });

  // DIVS dinamicos para los proyectos

  const contenedorProyectos = document.getElementById("contenedorProyectos")

  fetch('proyectos.json')
  .then(res => res.json())
  .then(datos => {
     datos.forEach(e => {
      const divProyecto = document.createElement("div")
      divProyecto.classList.add = ("col-lg-4 col-md-2 col-sm-1")
      divProyecto.className = "divProyecto"     
      divProyecto.innerHTML = 
      `
      <div class="divImgProyectos divProyectos${e.id}">
      <img class="imgProyectos img${e.id}" src="${e.img}">
      </div>

      <div class="d-flex flex-column align-items-center m-2">
      <h4 class="m-3 h4Nombre">${e.nombre}</h4>
      <h5>${e.programas}</h5>
      <a href="${e.url}" target="_blank" class="aCode">Code &lt;/&gt </a>
      </div>
      
      `

      contenedorProyectos.appendChild(divProyecto)
    })
  })
