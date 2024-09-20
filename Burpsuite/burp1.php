<?php
$headers = getallheaders();

foreach ($headers as $header => $value) {
    echo "$header: $value <br />\n";
}