<?php
// Carga el header
require('includes/header.php');
?>
<style>
  #resultado {
    font-weight: bold;
    font-size: 5rem;
    text-align: center;
  }
</style>
<div class="container">
  <!-- Indicamos al usuario que necesitamos permiso para acceder a su cámara -->
  <div class="row">
    <div class="alert holo-btn" role="alert">
      Permite el acceso a la cámara para que esta página funcione.
    </div>
  </div>
  <br>
  <div class="row">
    <div class="text-center" role="alert">
      <h2></h2>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6" style="border-radius: 2.5rem; border-style: dashed; border-color: aquamarine; border-width: 0.2rem;">
      <!-- Definimos una sección principal -->
      <main>
        <div class="px-4 py-2 my-2 text-center border-bottom" style="color: aquamarine;">
          <h1 class="display-5 fw-bold">Detección en vivo</h1>
        </div>
        <div class="b-example-divider" style="color:aquamarine;"></div>
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-12 text-center" style="color:aquamarine;">
              <!-- Definimos una sección que va a mostrar el vídeo -->
              <video id="video" playsinline autoplay></video>
              <!-- Definimos un canvas que mostrara una versión del video reducida y que tiene el tamaño justo que ocupa nuestro modelo -->
              <canvas id="canvas" width="260" height="260" style="max-width: 100%; display:none;"></canvas>
              <canvas id="otrocanvas" width="260" height="260" style="display: none"></canvas>
              <br>
              <h3>Estoy viendo</h3>
              <!-- Mostramos el resultado de nuestra predicción -->
              <div id="resultado"></div>
              <br>
              <!-- Botón que sirve para cambiar la cámara si estamos en un celular -->
              <button class="btn holo-btn mb-2" id="cambiar-camara" onclick="cambiarCamara();">Cambiar cámara</button>
              <br>
            </div>
          </div>
        </div>
    </div>


    <div class="b-example-divider"></div>

    <div class="b-example-divider mb-0"></div>
    </main>
  </div>
  <div class="col-md-3"></div>
</div>

</div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"></script>
<!-- Cargamos nuestro script para la detección en vivo -->
<script src="js/deteccionEnVivo.js"></script>
<?php
// Carga el footer
require('includes/footer.php');
?>