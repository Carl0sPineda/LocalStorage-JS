// Obtenemos los elementos del DOM necesarios
const tituloInput = document.querySelector("#titulo");
const nombreInput = document.querySelector("#nombre");
const mensajeTextarea = document.querySelector("#mensaje");
const enviarButton = document.querySelector("#enviar");

// Creamos un arreglo vacío para guardar los comentarios
let comments = [];

// Si hay comentarios en el localStorage, los obtenemos
if (localStorage.getItem("comments")) {
  comments = JSON.parse(localStorage.getItem("comments"));
}

enviarButton.addEventListener("click", (e) => {
  // Prevenimos el comportamiento por defecto del botón
  e.preventDefault();

  // Obtenemos los valores de los inputs
  const titulo = tituloInput.value;
  const nombre = nombreInput.value;
  const mensaje = mensajeTextarea.value;

  // Verificamos que ambos campos sean ingresados
  if (titulo.trim() === "" || mensaje.trim() === "" || nombre.trim() === "") {
    // Mostramos una alerta indicando que ambos campos son requeridos
    Swal.fire({
      title: "Ocurrió un error",
      text: "Debes completar todos los campos, ingrese el nombre, título y mensaje.",
      icon: "info",
      confirmButtonText: "Aceptar",
    });
    return; // Detenemos la ejecución del código
  }

  // Creamos un nuevo objeto comment con los valores de los inputs
  const newComment = {
    // id: Date.now,
    titulo: titulo,
    nombre: nombre,
    mensaje: mensaje,
  };

  // Agregamos el nuevo comentario al arreglo comments
  comments.push(newComment);

  // Guardamos el arreglo comments en el localStorage
  localStorage.setItem("comments", JSON.stringify(comments));

  // Limpiamos los valores de los inputs
  tituloInput.value = "";
  nombreInput.value = "";
  mensajeTextarea.value = "";

  // Mostramos una alerta indicando que el comentario se guardó exitosamente
  Swal.fire({
    title: "Agregado",
    text: "Comentario guardado exitosamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  // Llamamos a la función para que muestre los comentarios actualizados
  mostrarComentarios();
});

function eliminarComentario(index) {
  comments = JSON.parse(localStorage.getItem("comments")) || [];

  Swal.fire({
    title: "¿Estás seguro?",
    text: "El comentario se eliminará permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#000000",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Utilizamos la variable global en lugar de declarar una variable local.
      comments.splice(index, 1);

      localStorage.setItem("comments", JSON.stringify(comments));
      Swal.fire({
        title: "Eliminado",
        text: "Comentario eliminado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      mostrarComentarios();
    }
  });
}

function mostrarComentarios() {
  // Obtenemos los comentarios del localStorage
  comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Obtenemos el contenedor donde se van a mostrar los comentarios
  const comentariosContainer = document.querySelector("#comentarios-container");

  // Vaciamos el contenedor
  comentariosContainer.innerHTML = "";

  // Si no hay comentarios, mostramos un mensaje indicando que no hay comentarios
  if (comments.length === 0) {
    comentariosContainer.innerHTML =
      "<p>No hay comentarios agregados de momento.</p>";
    return;
  }

  // Recorremos los comentarios y creamos el HTML correspondiente para cada uno
  for (let i = 0; i < comments.length; i++) {
    const comentario = comments[i];
    const comentarioHTML = `
            <div class="widget comentarios">
              <div class="contenedor">
                <div class="comentario d-flex flex-wrap">
                  <div class="foto">
                    <a href="#">
                      <img src="img/persona5.jpg" alt="" width="100" />
                    </a>
                  </div>

                  <div class="texto">
                    <a href="#">${comentario.nombre}</a>
                    <p>en <a href="#">${comentario.titulo}</a></p>
                    <p class="texto-comentario">
                      ${comentario.mensaje}
                    </p>
                  </div>

                  <div class="botones d-flex justify-content-start flex-wrap w-100">
                    <button class="eliminar" onclick="eliminarComentario(${i})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
    `;
    // Agregamos el HTML del comentario al

    // contenedor de comentarios
    comentariosContainer.innerHTML += comentarioHTML;
  }
}

// Llamamos a la función mostrarComentarios para que muestre los comentarios al cargar la página
mostrarComentarios();

// Agregamos un listener para el evento "storage" que se dispara cuando cambia el localStorage
window.addEventListener("storage", (e) => {
  // Si el cambio fue en el item "comments"
  if (e.key === "comments") {
    // Actualizamos el arreglo comments
    comments = JSON.parse(localStorage.getItem("comments")) || [];
    // Mostramos los comentarios actualizados
    mostrarComentarios();
  }
});
