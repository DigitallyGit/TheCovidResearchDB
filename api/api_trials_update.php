<?php

include 'common.php';

$dbConn = connect();
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $trial = json_decode(file_get_contents('php://input'), true);

    $sql = "
        UPDATE
            trials
        SET
            Last_Refreshed_on = '{$trial['Last_Refreshed_on']}',
            Public_title = '{$trial['Public_title']}',
            Scientific_title = '{$trial['Scientific_title']}',
            Acronym = '{$trial['Acronym']}',
            Primary_sponsor = '{$trial['Primary_sponsor']}',
            Date_registration = '{$trial['Date_registration']}',
            Date_registration3 = '{$trial['Date_registration3']}',
            Export_date = '{$trial['Export_date']}',
            Source_Register = '{$trial['Source_Register']}',
            web_address = '{$trial['web_address']}',
            Recruitment_status = '{$trial['Recruitment_Status']}',
            other_records = '{$trial['other_records']}',
            Inclusion_agemin = '{$trial['Inclusion_agemin']}',
            Inclusion_agemax = '{$trial['Inclusion_agemax']}',
            Inclusion_gender = '{$trial['Inclusion_gender']}',
            Date_enrollement = '{$trial['Date_enrollement']}',
            Target_size = '{$trial['Target_size']}',
            Study_type = '{$trial['Study_type']}',
            Study_design = '{$trial['Study_design']}',
            Phase = '{$trial['Phase']}',
            Countries = '{$trial['Countries']}',
            Contact_Firstname = '{$trial['Contact_Firstname']}',
            Contact_Lastname = '{$trial['Contact_Lastname']}',
            Contact_Address = '{$trial['Contact_Address']}',
            Contact_Email = '{$trial['Contact_Email']}',
            Contact_Tel = '{$trial['Contact_Tel']}',
            Contact_Affiliation = '{$trial['Contact_Affiliation']}',
            Inclusion_Criteria = '{$trial['Inclusion_Criteria']}',
            Exclusion_Criteria = '{$trial['Exclusion_Criteria']}',
            Condition = '{$trial['Condition']}',
            Intervention = '{$trial['Intervention']}',
            Primary_outcome = '{$trial['Primary_outcome']}',
            results_date_posted = '{$trial['results_date_posted']}',
            results_date_completed = '{$trial['results_date_completed']}',
            results_url_link = '{$trial['results_url_link']}',
            Retrospective_flag = '{$trial['Retrospective_flag']}',
            Bridging_flag_truefalse = '{$trial['Bridging_flag_truefalse']}',
            Bridged_type = '{$trial['Bridged_type']}',
            results_yes_no = '{$trial['results_yes_no']}'
        WHERE
            TrialID = '{$trial['TrialID']}'
    ";

    $q = $dbConn->prepare($sql);
    $q->execute();

    header('HTTP/1.1 200 OK');
    exit();
}

header('HTTP/1.1 400 Bad Request');
