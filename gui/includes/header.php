<!DOCTYPE html>
<html lang="es">

<head>
  Título 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Título del la aplicación web -->
    <title>GUI</title>
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
  <link rel="stylesheet" href="custom_style.css">
    <!-- CDN del boostrap, librería que usamos para diseñar nuestro código -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</head>

<body >
  <!-- Loader que bloquea la interfaz de usuario mientras se hace la predicción. -->
  <div class="loader d-none" id="loader">
  <img src="img/loader.gif" alt="loader" id="loader" style="margin-left:37%; margin-top:10%; width: 25%; z-index: 999; position: fixed;border-radius: 50%;">
  <h2 class="text-center" style="color: aquamarine; margin-top:40%">Pensando...</h2>
  </div>
  <!-- Menú nav de la aplicación -->
    <nav class="navbar navbar-expand-lg" style="color:aquamarine">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <!-- Logo de la aplicación -->
                <img src="img/logo.png" alt="" width="100" class="d-inline-block align-text-top" style="border-radius: 50%;">
              </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav" >
            <ul class="navbar-nav">
              <!-- Botón Inicio -->
              <li class="nav-item">
                <a class="nav-link holo-nav-link" href="index.php">Inicio</a>
              </li>
              <!-- Botón detección -->
              <li class="nav-item">
                <a class="nav-link holo-nav-link" href="live.php">Detección en vivo</a>
              </li>
              <!-- Logout -->
              <li class="nav-item d-flex d-sm-none">
                <img id="profile" src="" class="img-fluid px-2" style="border-radius: 50%; height:50px;" alt="">
            <a class="nav-link pt-1 holo-nav-link" href="logout.php">Cerrar Sesión</a>
              </li>
            </ul>
          </div>
          <div class="d-flex px-2 d-none d-lg-flex d-xl-flex">
            <img id="profile-mobile" src="" class="img-fluid px-2" style="border-radius: 50%; height:50px;" alt="">
            <a class="nav-link pt-1 holo-nav-link" href="logout.php">Cerrar Sesión</a>
          </div>
        </div>
      </nav>
