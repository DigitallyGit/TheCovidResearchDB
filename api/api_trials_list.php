<?php

include 'common.php';

$dbConn = connect();
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $sql = '
        SELECT TrialID, Public_title, Countries, web_address
        FROM trials
    ';
    $q = $dbConn->prepare($sql);
    $q->execute();
    $q->setFetchMode(PDO::FETCH_ASSOC);
    $result = $q->fetchAll();

    echo json_encode($result);
    exit();
}

header('HTTP/1.1 400 Bad Request');
