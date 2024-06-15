/* Bootstrap 5 JS included */

console.clear();
('use strict');

//Metodo que se ejecuta al cargar la ventana
window.onload = (event) => {
  var name = getCookie('name');
  //se obtiene el nombre del usuario
   name="";
  if (name == null || name == "") {
    window.location.href = "login.php"; //Redirige a la ventana login si no ha iniciado sesión
  }

  var profilePic = getCookie('image'); //Obtiene la foto del usuario
  //se definen los datos del usuario para la interfaz principal,c omo su nombre, y foto de perfil.
  var profile = document.getElementById('profile');
  profile.setAttribute("src", profilePic);
  profile.setAttribute("alt", name)
  profile.setAttribute("title", name)
  //Se definen los datos del perfil para la versión mobile
  var profileMobile = document.getElementById('profile-mobile');
  profileMobile.setAttribute("src", profilePic);
  profileMobile.setAttribute("alt", name)
  profileMobile.setAttribute("title", name)
  var user = document.getElementById('user')
  user.setAttribute("value", name);
  windows.reload();
};

//Función para obtener las cookies
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

//Reiniciar la imagen e interfaz.
function resetImage() {
  location.reload();
}

//Función para predicción erronea
function noAnswer() {

  //Muestra la pregunta si es correcta 
  var question = document.getElementById('question');

  question.classList.add("d-none");
  question.classList.remove("animate__animated");
  question.classList.remove("animate__fadeInDown");

  //Muestra la sección 
  var answer = document.getElementById('answer');

  answer.classList.remove("d-none");
  answer.classList.add("animate__animated");
  answer.classList.add("animate__fadeInDown");

  answer.scrollIntoView(true); //Ubicamos al usuario en la siguiente pregunta.
}

//Cuando se responde que si se envia un agradeciento.
function yesAnswer() {
  var question = document.getElementById('question');

  question.classList.add("d-none");
  question.classList.remove("animate__animated");
  question.classList.remove("animate__fadeInDown");
  question.scrollIntoView(true);

  //Toast que muestra el mensaje
  var toastMessage = document.getElementById('toast_body');
  toastMessage.innerText = "Gracias, tus comentarios nos ayudan a mejorar el servicio.";
  var toast = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
  toastBootstrap.show();
}

//Envia la categoría correcta al enviar el feedback
function setCategory(category) {
  //Llena la categoría en el campo
  var newCategory = document.getElementById('form_category');
  newCategory.setAttribute("value", category.value);

  //cambiamos el endpoint para que envie el feedback
  var uriContainer = document.getElementById('upload_image_background');
  uriContainer.setAttribute("data-post-url", "http://localhost:5000/feedback/")

  //
  var form = document.getElementById('prediction_form');
  var feedback = new FormData(form);
  url = "http://localhost:5000/feedback/"

  fetch(url, {
    method: 'POST',
    body: feedback
  })
    .then(response => response.json())//Obtenemos la respuesta del servidor
    .then(data => {
      console.log('posted: ', data);
      document.getElementById('prediction-title').innerText = data.Category;
      var toastMessage = document.getElementById('toast_body');
      toastMessage.innerText = data.Message;
      var toast = document.getElementById('liveToast');
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)//Lanzamos una notificación con la respuesta del servidor
      toastBootstrap.show();

      //  Obtenemos el contenedor de la respuesta para modificarla
      var answer = document.getElementById('answer');

      answer.classList.add("d-none");
      answer.classList.remove("animate__animated");
      answer.classList.remove("animate__fadeInDown");
      answer.scrollIntoView(true);

      if (data.success === true) {
        // mostramos la imagen con su información
        previewFiles(dataRefs);

      } else {
        console.log('URL: ', url, '  prediction: ', category.value)
      }
    })
    .catch(error => {//Si ocurre un error lo mostramos en la consola
      console.error('errored: ', error);
    });
}

//Función que hace busquedas de google a partir de la predicción
function searchInGoogle() {
  var searchWord = document.getElementById('prediction-title').innerText //Obtiene el texto de la predicción
  var uri = 'https://www.google.com/search?q=cultivo de ' + searchWord; //Arma el enlace con el termino de busqueda
  window.open(uri, '_blank');
}

// Drag and drop - Función para arrastrar y soltar las imagenes de carga.
(function () {

  'use strict';

  // Objetos de interes: drop zones, input elements, gallery elements, and the files.
  // dataRefs = {files: [image files], input: element ref, gallery: element ref}

  const preventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const highlight = event =>
    event.target.classList.add('highlight');

  const unhighlight = event =>
    event.target.classList.remove('highlight');

  //Obtener las referencias de los elementos para galería
  const getInputAndGalleryRefs = element => {
    const zone = element.closest('.upload_dropZone') || false;
    const gallery = zone.querySelector('.upload_gallery') || false;
    const input = zone.querySelector('input[type="file"]') || false;
    return { input: input, gallery: gallery };
  }

  //Manejador para el momento de soltar las imagenes.
  const handleDrop = event => {
    const dataRefs = getInputAndGalleryRefs(event.target);
    dataRefs.files = event.dataTransfer.files;
    handleFiles(dataRefs);
  }


  const eventHandlers = zone => {

    const dataRefs = getInputAndGalleryRefs(zone);
    if (!dataRefs.input) return;

    // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, preventDefaults, false);
      document.body.addEventListener(event, preventDefaults, false);
    });

    // Reenmarcar el área cuando se suelta un archivo
    ;['dragenter', 'dragover'].forEach(event => {
      zone.addEventListener(event, highlight, false);
    });
    ;['dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, unhighlight, false);
    });

    // Manejar los archivos soltados
    zone.addEventListener('drop', handleDrop, false);

    // Manejar archivos seleccionados
    dataRefs.input.addEventListener('change', event => {
      dataRefs.files = event.target.files;
      handleFiles(dataRefs);
    }, false);

  }


  // Inicializar todas las zonas para soltar las imagenes
  const dropZones = document.querySelectorAll('.upload_dropZone');
  for (const zone of dropZones) {
    eventHandlers(zone);
  }


  //Restringir imagenes GIF, PDF o webp para soltar aquí
  const isImageFile = file =>
    ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type);

  //Funcion para previsualizar los archivos de imagen
  function previewFiles(dataRefs) {
    if (!dataRefs.gallery) return;
    for (const file of dataRefs.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        let img = document.createElement('img');
        img.className = 'img-fluid img-prediction';
        img.setAttribute('alt', file.name);
        img.src = reader.result;
        dataRefs.gallery.appendChild(img);
        let draganddrop = document.getElementById('draganddrop');
        draganddrop.className = 'd-none'
        let escoger = document.getElementById('escoger');
        escoger.className = 'd-none'
        let reset = document.getElementById('reset');
        reset.className = 'btn btn-danger m-3'

      }
    }
  }

  // Función para enviar imagenes 
  const imageUpload = dataRefs => {
    //Declarar el ladoer que se muestra y bloquea la interfaz.
    var loader = document.getElementById('loader');

    //Mostramos el loader
    loader.classList.remove("d-none");

    //Mostramos el mensaje cargar imagen en consola
    console.log("Cargar imagen");

    //Definimos el mensaje Pensando...
    document.getElementById('prediction-title').innerText = "Pensando..."

    // Validamos los arhvicos doble vez
    if (!dataRefs.files || !dataRefs.input) return;

    // Obtenemos la URL del endpoint para enviar la imagen.
    const url = dataRefs.input.getAttribute('data-post-url');
    if (!url) return;

    //Mostramos en consola la URL
    console.log("url: " + url);

    //obtenemos el tipo de predicción que se tiene que hacer
    const predict = dataRefs.input.getAttribute('data-post-prediction');
    if (!predict) return;

    console.log("predict: " + predict);

    // Obtenemos el usuario esta haciendo la petición
    const user = dataRefs.input.getAttribute('data-post-user');
    if (!user) return;

    console.log("Agent: " + user);

    //Preparamos el formulario para enviarlo
    var form = document.getElementById('prediction_form');
    var cultivo = new FormData(form);

    //Hacemos la peticion a traves de un fetch con el metodo POST
    fetch(url, {
      method: 'POST',
      body: cultivo,
      mode: 'no-cors'
    })
      .then(response => response.json()) //Obtenemos la respeusta del servidor.
      .then(data => {
        
        loader.classList.add("d-none");//Ocultamos el loader
        console.log('posted: ', data) //Mostramos la información enviada
        var json = JSON.parse(data) //Parseamos la respuesta del servidor
        //Cambiamos el titulo de la predicción por el resultado de la predicción
        document.getElementById('prediction-title').innerText = json["tipo"];
        //Cambiamos la descripción de la predicción, por la información 
        document.getElementById('caption').innerText = json["informacion"];
        //Mostrar la pregunta.
        var question = document.getElementById('question');
        question.classList.remove("d-none");
        question.classList.add("animate__animated");
        question.classList.add("animate__fadeInDown");
        document.querySelector("#question").scrollIntoView();

        if (data.Success === false) {
          //En caso de error al parsear la respuesta lo mostramos
          alert(data.Message + " Error;" + data.Exception);

        } else {
          console.log('URL: ', url, '  prediction: ', predict)
        }
      })
      .catch(error => {
        //Si hay un error de comunicación con el servidor lo mostramos y lo colocamos en la interfaz.
        console.error('errored: ', error);
        alert("Imposible conectar con el servidor. Error: " + error)
        loader.classList.add("d-none");
        document.getElementById('prediction-title').innerText = "Ocurrió un error, intenta de nuevo más tarde."
      });
  }


  // Validar la extensión de los archivos
  const handleFiles = dataRefs => {

    let files = [...dataRefs.files];

    // Eliminamos las imagenes no validas u otro tipo de archivos.
    files = files.filter(item => {
      if (!isImageFile(item)) {
        console.log('Not an image, ', item.type);
        //Mostramos el aviso de que el tipo de archivo no es admitido.
        alert("Tipo de archivo no permitido, debes seleccionar un archivo de imagen");
      }
      return isImageFile(item) ? item : null;
    });

    if (!files.length) return;
    dataRefs.files = files;

    //Finalmente mostramos una preview de la imagen
    previewFiles(dataRefs);
    //Enviamos la imagena predicción llamando esta funcion.
    imageUpload(dataRefs);
  }

})();