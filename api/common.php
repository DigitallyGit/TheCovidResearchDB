<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-API-KEY, Api-Token, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');
header('content-type: application/json; charset=utf-8');


$method = $_SERVER['REQUEST_METHOD'];

// Cancel preflight requests
if ($method == 'OPTIONS') {
    die();
}


function connect($db='BD.sqlite') {
    $config = parse_ini_file('config.ini', false, INI_SCANNER_TYPED);
    try {
        $db = $config['live_dir'] . '/' . $db;
        $conn = new PDO('sqlite:' . $db);

        // Set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    } catch (PDOException $exception) {
        exit($exception->getMessage());
    }
}
