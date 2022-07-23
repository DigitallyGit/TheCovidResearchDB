<?php

include 'common.php';

$dbConn = connect();
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $sql = "
        DELETE FROM trials
        WHERE TrialID = '{$_GET['TrialID']}'
    ";

    $q = $dbConn->prepare($sql);
    $q->execute();

    header('HTTP/1.1 200 OK');
    exit();
}

header('HTTP/1.1 400 Bad Request');
