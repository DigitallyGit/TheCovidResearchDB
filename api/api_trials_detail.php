<?php

include 'common.php';

$dbConn = connect();
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $sql = "
        SELECT *
        FROM trials
        WHERE TrialID = '{$_GET['TrialID']}'
    ";
    $q = $dbConn->prepare($sql);
    $q->execute();
    $q->setFetchMode(PDO::FETCH_ASSOC);
    $result = $q->fetch();

    if (!$result) {
        header('HTTP/1.1 404 Not Found');
        exit();
    }

    header('HTTP/1.1 200 OK');
    echo json_encode($result);
    exit();
}

header('HTTP/1.1 400 Bad Request');
