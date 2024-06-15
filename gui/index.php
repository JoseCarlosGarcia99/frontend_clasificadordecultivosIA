   <?php

    // Carga el nav y la cabezera del sitio web
    require('includes/header.php');

    ?>
   <div class="container background">
       <br>
       <div class="row">
           <div class="col-md-6 mt-5" style="border-radius: 2.5rem; border-style: dashed; border-color: aquamarine; border-width: 0.2rem;">
               <form id="prediction_form" method="post" enctype="multipart/form-data" style="color: aquamarine;">

                   <fieldset class="upload_dropZone text-center mb-5 p-4">

                        <!-- Sección para cargar y seleccionar la imagen -->

                       <legend class="visually-hidden">Image uploader</legend>

                       <svg class="upload_svg" width="60" height="60" aria-hidden="true">
                           <use href="#icon-imageUpload"></use>
                       </svg>

                       <p id="draganddrop"> Arrastra y suelta la imágen dentro del área
                           punteada<br><i>o</i></p>
                       <!--Input que guarda el nombre de usuario autenticado-->
                       <input id="user" name="user" type="text" value="Samuel" hidden="true"> 
                       <!--Input que almacena la predicción correcta cuando se envia Feedbac -->
                       <input id="form_category" name="form_category" type="text" value="" hidden="true"> 
                       <!--Input que almacena la imagen y los datos de consulta del endpoint del backend-->
                       <input id="upload_image_background" name="predict" data-post-prediction="predict" data-post-user="web-client" data-post-url="http://localhost:5000/predict/" class="position-absolute invisible" type="file" accept="image/jpeg, image/png" capture="environment"/>
                       <!-- Mensaje que se muestra al usuario para que pueda arrastrar y soltar la imagen o seleccionarla desde su galería -->
                       <label class="btn holo-btn" for="upload_image_background" id="escoger">Escoger de mi
                           galería</label>

                       <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                       <!-- Botón que limpia la imagen para poder cargar otra -->
                       <button class="d-none holo-btn" id="reset" type="reset" onclick="resetImage()">Limpiar</button>
                   </fieldset>
               </form>
           </div>

           <!-- Sección que muestra la información del tipo de cultivo seleccionado -->
           <div class="col-md-6 mt-5 d-flex justify-content-center p-3">
               <div class="card" style="width: 50rem; border-width: 0 !important; box-shadow: 0 0 15px aquamarine; border-radius: 5px;" >
                   <!-- <img src="img/no.svg" class="card-img-top" alt="image"> -->
                   <div class="card-body " style="background-color: rgb(17, 4, 81) !important; color:aquamarine; border-style: none;">
                       <h5 class="card-title" id="prediction-title">Predicción</h5>
                       <p class="card-text" id="caption">Una vez que el sistema identifique el cultivo que subiste te dará una breve descripción del tipo de cultivo</p>
                       <button onclick="searchInGoogle()" class="btn holo-btn" >Buscar en Google</button>
                   </div>
               </div>
           </div>
       </div>

       <!-- Sección que muestra la notificación de agradecimiento al enviar un feedback -->
       <div class="toast-container position-fixed bottom-0 end-0 p-3">
           <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
               <div class="toast-header">
                   <img src="img/ia.png" class="rounded me-2" alt="..." style="height:25px; width:25px;">
                   <strong class="me-auto">Gracias por tu Feedback</strong>
                   <small>Justo ahora</small>
                   <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
               </div>
               <div class="toast-body" id="toast_body">

               <!-- Sección donde se muestra la respuesta de la API -->

               </div>
           </div>
       </div>

       <br><br>
        <!-- Cuestionario sobre la predicción  -->
       <div class="row d-none" id="question" style="color:aquamarine;">
           <div class="col-md-12 d-flex justify-content-center">
               <h2>¿Es correcta la predicción?</h2>
           </div>
           <div class="col-md-12 d-flex justify-content-center">
                <!-- Botones de si y no, en caso de no se muestra otra pregunta, en caso de si no es necesaria ninguna acción-->
               <button class="btn holo-btn m-4" onclick="yesAnswer();">Si</button><button class="btn holo-danger-btn m-4" onclick="noAnswer();">No</button>
           </div>
       </div>
       <br><br>
       <div class="row justify-content-center d-none" id="answer" style="color:aquamarine">
           <div class="col-md-12 d-flex justify-content-center">
                <!-- Segunda pregunta de cuestionario sobre predicción, en caso de que no sea correcta se selecciona la categoría correcta -->
               <h2>¿A que categoría pertenece?</h2>
           </div>
           <div class="col-md-6 ">
               <br>
               <!-- Lista de categorías para seleccionar -->
               <select name="category" id="category" class="form-select form-select-md mb-1" onchange="setCategory(this)">
                   <option value="">Seleccionar...</option>
                   <option value="agave">Agave</option>
                   <option value="brocoli">Brócoli</option>
                   <option value="cebolla">Cebolla</option>
                   <option value="jitomate">Jitomate</option>
                   <option value="lechuga">Lechuga</option>
                   <option value="maiz">Maíz</option>
                   <option value="trigo">Trigo</option>
                   <option value="zanahoria">Zanahoria</option>
               </select>
               <br>

           </div>
       </div>
   </div>
   <script>
       
   </script>
   <?php

    //Código para cargar el pie de página
    require('includes/footer.php');
    ?>