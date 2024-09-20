<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centered Text</title>
    <style>
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        }
        .centered-text {
            font-size: 48px;
            font-weight: bold;
        }
    </style>
</head>
<body>

<?php
    $headers = getallheaders();
    foreach ($headers as $header => $value) {
        echo "<div class='centered-text'>$header: $value</div>";
    }
?>

</body>
</html>


<?php
