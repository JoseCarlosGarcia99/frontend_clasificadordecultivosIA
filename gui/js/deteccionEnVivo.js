    //Inicializamos las variables que definen nuestros canvas, la seccion de videos, cámaras y stream.
    var tamano = 260;
    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var otrocanvas = document.getElementById("otrocanvas");
    var ctx = canvas.getContext("2d");
    var currentStream = null;
    var facingMode = "environment";

    var modelo = null;

    //Aquí cargamos las funciones necesarias para que el reconocimiento en vivo funcione en todo momento que la páginna este encendida
    (async() => {
      console.log("Cargando modelo...");
      modelo = await tf.loadLayersModel("js/model.json");//Cargamos los archivos binarios que contiene los pesos para la predicción.
      console.log("Modelo cargado");
      mostrarCamara();//mostramos la cámara.
    })();

    window.onload = function() {
      
    }

    //Pasamos los parametros para mostrar la cámara
    function mostrarCamara() {
      var opciones = {
        audio: false,//Desactivamos el audio.
        video: {
          width: tamano, height: tamano //Definimos el tamaño
        }
      }

      //revisamos las opciones que tiene el navegador sobre las cámaras disponibles y empezamos el stream de vídeo.
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(opciones)
            .then(function(stream) { //En caso de que el usuario de permiso de uso de la cámara iniciamos el stream de vídeo.
              currentStream = stream;
              video.srcObject = currentStream;
              procesarCamara();
              setInterval(predecir, 500); 
            })
            .catch(function(err) {//En caso de que el usuario no de permiso o no se encuentre la cámara lanzamos un error
              alert("No se pudo utilizar la camara :(");
              console.log(err);
              alert(err);
            })
      } else {
        alert("No existe la función getUserMedia");
      }
    }

    function cambiarCamara() {//Función que cambia entre las cámaras disponbles en el dispositivo.
          if (currentStream) {
              currentStream.getTracks().forEach(track => {
                  track.stop();
              });
          }

          facingMode = facingMode == "user" ? "environment" : "user";//Verificamos si el usuario tiene cámara frontal y si no abrimos la principal

          var opciones = {
              audio: false,
              video: {
                  facingMode: facingMode, width: tamano, height: tamano
              }
          };


          navigator.mediaDevices.getUserMedia(opciones)
              .then(function(stream) {
                  currentStream = stream;
                  video.srcObject = currentStream;
              })
              .catch(function(err) {
                  console.log("Oops, hubo un error", err);
              })
      }

    function procesarCamara() {// Función para procesar la cámara y colocar un timeout en caso que no se pueda
      ctx.drawImage(video, 0, 0, tamano, tamano, 0, 0, tamano, tamano);
      setTimeout(procesarCamara, 500);
    }

    function predecir() {//Creamos la función de predecir 

      if (modelo != null) {
        resample_single(canvas, 130, 130, otrocanvas);

        //Inicializamos los canvas para obtener las imagenes.
        var ctx2 = otrocanvas.getContext("2d");
        var imgData = ctx2.getImageData(0,0, 130, 130);

        var arr = [];
        var arr130 = [];

        for (var p=0; p < imgData.data.length; p+= 4) { //Descomponemos la imagen del canva en tres colores 
          var rojo = imgData.data[p] / 255;
          var verde = imgData.data[p+1] / 255;
          var azul = imgData.data[p+2] / 255;

          arr130.push([rojo, verde, azul]);
          if (arr130.length == 130) {
            arr.push(arr130);
            arr130 = [];
          }
        }

        arr = [arr];
        //Inicializamos el tensor
        var tensor = tf.tensor4d(arr);
        var resultado = modelo.predict(tensor).dataSync();// usamos el tensor para hacer la predicción.

        var maxIndex = resultado.indexOf(Math.max(...resultado));//guardamos el indice de predicción.

        var respuesta;

        console.log(maxIndex)

        //Comparamos el índice de predicción para saber que tipo de cultivo fue.
        if (maxIndex == 0) {
          respuesta = "Agave";
        } else if(maxIndex == 1){
          respuesta = "Brocoli";
        }else if(maxIndex == 2){
          respuesta = "Cebolla";
        }else if(maxIndex == 3){
          respuesta = "Jitomate";
        }else if(maxIndex == 4){
          respuesta = "Lechuga";
        }else if(maxIndex == 5){
          respuesta = "Maíz";
        }else if(maxIndex == 6){
          respuesta = "Trigo";
        }else if(maxIndex == 7){
          respuesta = "Zanahoria";
        }else {
          console.log("Desconocido")
        }
        
        //insertamos la  respuesta de la predicción en el resultado.
        document.getElementById("resultado").innerHTML = respuesta;

      }

      //Tiene medio segundo de espara para poder hacer la predicción.
      setTimeout(predecir, 500);
    }


    /**
       * Hermite resize - fast image resize/resample using Hermite filter. 1 cpu version!
       * 
       * @param {HtmlElement} canvas
       * @param {int} width
       * @param {int} height
       * @param {boolean} resize_canvas if true, canvas will be resized. Optional.
       * 
       */
      function resample_single(canvas, width, height, resize_canvas) {
          var width_source = canvas.width;
          var height_source = canvas.height;
          width = Math.round(width);
          height = Math.round(height);

          var ratio_w = width_source / width;
          var ratio_h = height_source / height;
          var ratio_w_half = Math.ceil(ratio_w / 2);
          var ratio_h_half = Math.ceil(ratio_h / 2);

          var ctx = canvas.getContext("2d");
          var ctx2 = resize_canvas.getContext("2d");
          var img = ctx.getImageData(0, 0, width_source, height_source);
          var img2 = ctx2.createImageData(width, height);
          var data = img.data;
          var data2 = img2.data;

          for (var j = 0; j < height; j++) {
              for (var i = 0; i < width; i++) {
                  var x2 = (i + j * width) * 4;
                  var weight = 0;
                  var weights = 0;
                  var weights_alpha = 0;
                  var gx_r = 0;
                  var gx_g = 0;
                  var gx_b = 0;
                  var gx_a = 0;
                  var center_y = (j + 0.5) * ratio_h;
                  var yy_start = Math.floor(j * ratio_h);
                  var yy_stop = Math.ceil((j + 1) * ratio_h);
                  for (var yy = yy_start; yy < yy_stop; yy++) {
                      var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                      var center_x = (i + 0.5) * ratio_w;
                      var w0 = dy * dy; //pre-calc part of w
                      var xx_start = Math.floor(i * ratio_w);
                      var xx_stop = Math.ceil((i + 1) * ratio_w);
                      for (var xx = xx_start; xx < xx_stop; xx++) {
                          var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                          var w = Math.sqrt(w0 + dx * dx);
                          if (w >= 1) {
                              //pixel too far
                              continue;
                          }
                          //hermite filter
                          weight = 2 * w * w * w - 3 * w * w + 1;
                          var pos_x = 4 * (xx + yy * width_source);
                          //alpha
                          gx_a += weight * data[pos_x + 3];
                          weights_alpha += weight;
                          //colors
                          if (data[pos_x + 3] < 255)
                              weight = weight * data[pos_x + 3] / 250;
                          gx_r += weight * data[pos_x];
                          gx_g += weight * data[pos_x + 1];
                          gx_b += weight * data[pos_x + 2];
                          weights += weight;
                      }
                  }
                  data2[x2] = gx_r / weights;
                  data2[x2 + 1] = gx_g / weights;
                  data2[x2 + 2] = gx_b / weights;
                  data2[x2 + 3] = gx_a / weights_alpha;
              }
          }


          ctx2.putImageData(img2, 0, 0);
      }