<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        window.onload = (event) => {
            eraseCookie('name');
            console.log('Sesión terminada');
            if (name == null || name == "") {
                window.location.href = "index.php";
            }
        };

        function eraseCookie(name) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    </script>
</body>

</html>