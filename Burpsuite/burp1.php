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
    $page -> setTitle("Nya?");
    if (isset($_SERVER['HTTP_USER_AGENT'])) {
        $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        if (str_contains($userAgent, "meowlingual")) {
            echo "<div class='centered-text'> Congrats nya <3 </div>";
        } else {
            echo "<div class='centered-text'> User-Agent is $userAgent...\n I only trust <a href='https://www.japantrendshop.com/meowlingual-cat-translation-device-p-2739.html?srsltid=AfmBOopOwWSI982TvnizjgGesrIfPwCot9wbTTg8e91b4TtxytcEylI3'> meowlingual cat translation devices!</a></div>";
        }
     } else {
        echo "<div class='centered-text'> User-Agent header is not set. </div>";
     }
?>

</body>
</html>


<?php
