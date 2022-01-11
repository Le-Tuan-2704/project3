<!DOCTYPE html>
<html lang="en">

<head>
    <title>Sending Email with Laravel Mailer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/f714ee491f.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container" style="margin: auto">
        <h1 class="text-success">
            Tài khoản username: {{$name}}
        </h1>
        <br>
        <img width="500" src={{$img}} alt="">
        <br>
        <br>
        <h1 class="text-success">
            My new password : <i>{{$password}}</i>
        </h1>

    </div>
</body>

</html>