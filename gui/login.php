<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Carga el header de la página de inicio de sesión -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <div class="video-container">
        <!-- Carga el video de fondo -->
        <video autoplay muted loop id="video" class="img-responsive">
            <source src="background-2.mp4" type="video/mp4">
        </video>
        <div class="d-flex justify-content-center">
            <!-- Carga los botones de inicio de sesión de Google -->
            <div class="g-signin2" id="btnLogin" data-onsuccess="onSignIn"></div>
            <div id="g_id_onload" data-client_id="768804476789-mcdaf58eldm6pg3li0i596pl6cqtslkv.apps.googleusercontent.com" data-context="signin" data-ux_mode="popup" data-login_uri="https://clasificadordecultivos.com.mx" data-callback="onSignIn" data-auto_prompt="false">
            </div>

            <div class="g_id_signin " data-type="standard" data-shape="rectangular" data-theme="outline" data-text="signin_with" data-size="large" data-logo_alignment="left" style="margin-top: 40rem;">
            </div>
        </div>
    </div>
    <footer>
        <script>
            // Obtiene el vídeo 
            var video = document.getElementById("video");

            // Obtiene el botón login
            var btn = document.getElementById("btnLogin");

            // Función Sign In para el inicio de sesión con google
            function onSignIn(response) {
                const responsePayload = decodeJwtResponse(response.credential); //Descodificamos nuestro JWT
                console.log(responsePayload) // hacemos un cosole log de nuestra respuesta
                console.log('ID: ' + responsePayload.sub); // Id de la sesión
                console.log('Name: ' + responsePayload.given_name); //Nombre del usuario
                console.log('Image URL: ' + responsePayload.picture); //Foto de perfil
                console.log('Email: ' + responsePayload.email); // Dirección de correo del usuario

                //Cookies con vigencia de 14 días
                setCookie('name', responsePayload.given_name, 14); //Almacenamos el nombre en una cookie
                setCookie('image', responsePayload.picture, 14); //Almacenamos la foto del perfil en una cookie
                setCookie('email', responsePayload.email, 14); //Almacenamos el email en una cookie

                window.location.href = "index.php"; //Redireccionamos al usuario a la página principal
            }

            //Función para decodificar respuesta 
            function decodeJwtResponse(token) {
                var base64Url = token.split(".")[1];
                var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                var jsonPayload = decodeURIComponent(
                    atob(base64)
                    .split("")
                    .map(function(c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
                );

                return JSON.parse(jsonPayload);
            }

            //Función para crear cookies con vigencia
            function setCookie(name, value, days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }

            //Función para obtener una cookie guardada en el navegador
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

            //Función para eliminar cookie
            function eraseCookie(name) {
                document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }

            // window.onload = (event) => {
            //     setCookie('name', 'Samuel', 14);
            //     setCookie('image','https://lh3.googleusercontent.com/a/ACg8ocKnaAWG7py_dLqFGonOXw7SjXKxl5Om7V5R2rHZSSppMw=s96-c',14)
            //     console.log(name);
            //     if (name == null || name == "") {
            //         window.location.href = "index.php";
            //     }
            // };
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://accounts.google.com/gsi/client" async></script>
    </footer>
</body>

</html>