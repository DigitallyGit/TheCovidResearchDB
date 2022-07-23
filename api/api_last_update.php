<?php

include 'common.php';

$dbConn = connect();
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $sql = "
        SELECT last_update
        FROM last_update
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
    echo json_encode($result['last_update']);
    exit();
}

header('HTTP/1.1 400 Bad Request');
