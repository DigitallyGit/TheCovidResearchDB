<?php

include 'common.php';

$dbConn = connect();
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $sql = "
        INSERT INTO trials (
            TrialID,
            Last_Refreshed_on,
            Public_title,
            Scientific_title,
            Acronym,
            Primary_sponsor,
            Date_registration,
            Date_registration3,
            Export_date,
            Source_Register,
            web_address,
            Recruitment_Status,
            other_records,
            Inclusion_agemin,
            Inclusion_agemax,
            Inclusion_gender,
            Date_enrollement,
            Target_size,
            Study_type,
            Study_design,
            Phase,
            Countries,
            Contact_Firstname,
            Contact_Lastname,
            Contact_Address,
            Contact_Email,
            Contact_Tel,
            Contact_Affiliation,
            Inclusion_Criteria,
            Exclusion_Criteria,
            Condition,
            Intervention,
            Primary_outcome,
            results_date_posted,
            results_date_completed,
            results_url_link,
            Retrospective_flag,
            Bridging_flag_truefalse,
            Bridged_type,
            results_yes_no
        )
        VALUES (
            '{$data['TrialID']}',
            '{$data['Last_Refreshed_on']}',
            '{$data['Public_title']}',
            '{$data['Scientific_title']}',
            '{$data['Acronym']}',
            '{$data['Primary_sponsor']}',
            '{$data['Date_registration']}',
            '{$data['Date_registration3']}',
            '{$data['Export_date']}',
            '{$data['Source_Register']}',
            '{$data['web_address']}',
            '{$data['Recruitment_Status']}',
            '{$data['other_records']}',
            '{$data['Inclusion_agemin']}',
            '{$data['Inclusion_agemax']}',
            '{$data['Inclusion_gender']}',
            '{$data['Date_enrollement']}',
            '{$data['Target_size']}',
            '{$data['Study_type']}',
            '{$data['Study_design']}',
            '{$data['Phase']}',
            '{$data['Countries']}',
            '{$data['Contact_Firstname']}',
            '{$data['Contact_Lastname']}',
            '{$data['Contact_Address']}',
            '{$data['Contact_Email']}',
            '{$data['Contact_Tel']}',
            '{$data['Contact_Affiliation']}',
            '{$data['Inclusion_Criteria']}',
            '{$data['Exclusion_Criteria']}',
            '{$data['Condition']}',
            '{$data['Intervention']}',
            '{$data['Primary_outcome']}',
            '{$data['results_date_posted']}',
            '{$data['results_date_completed']}',
            '{$data['results_url_link']}',
            '{$data['Retrospective_flag']}',
            '{$data['Bridging_flag_truefalse']}',
            '{$data['Bridged_type']}',
            '{$data['results_yes_no']}'
        )
    ";

    $q = $dbConn->prepare($sql);
    $q->execute();

    $trialID = $dbConn->lastInsertId();
    $response = [
        'TrialID' => $trialID,
    ];

    header('HTTP/1.1 200 OK');
    echo json_encode($response);
    exit();
}

header('HTTP/1.1 400 Bad Request');
