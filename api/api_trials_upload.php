<?php

set_time_limit(0);

include 'common.php';

$method = $_SERVER['REQUEST_METHOD'];

function parseXML($file) {
    $dbConn = connect();
    $xml = simplexml_load_file($file);
    foreach ($xml->Trial as $trial) {
        $trialID = $trial->TrialID;

        $sql = "
            SELECT *
            FROM trials
            WHERE TrialID = '{$trialID}'
        ";
        $q = $dbConn->prepare($sql);
        $q->execute();
        $q->setFetchMode(PDO::FETCH_ASSOC);
        $result = $q->fetch();

        if ($result) {
            $sql = "
                UPDATE
                    trials
                SET
                    Last_Refreshed_on = '{$trial->Last_Refreshed_on}',
                    Public_title = '{$trial->Public_title}',
                    Scientific_title = '{$trial->Scientific_title}',
                    Acronym = '{$trial->Acronym}',
                    Primary_sponsor = '{$trial->Primary_sponsor}',
                    Date_registration = '{$trial->Date_registration}',
                    Date_registration3 = '{$trial->Date_registration3}',
                    Export_date = '{$trial->Export_date}',
                    Source_Register = '{$trial->Source_Register}',
                    web_address = '{$trial->web_address}',
                    Recruitment_status = '{$trial->Recruitment_Status}',
                    other_records = '{$trial->other_records}',
                    Inclusion_agemin = '{$trial->Inclusion_agemin}',
                    Inclusion_agemax = '{$trial->Inclusion_agemax}',
                    Inclusion_gender = '{$trial->Inclusion_gender}',
                    Date_enrollement = '{$trial->Date_enrollement}',
                    Target_size = '{$trial->Target_size}',
                    Study_type = '{$trial->Study_type}',
                    Study_design = '{$trial->Study_design}',
                    Phase = '{$trial->Phase}',
                    Countries = '{$trial->Countries}',
                    Contact_Firstname = '{$trial->Contact_Firstname}',
                    Contact_Lastname = '{$trial->Contact_Lastname}',
                    Contact_Email = '{$trial->Contact_Email}',
                    Contact_Tel = '{$trial->Contact_Tel}',
                    Contact_Affiliation = '{$trial->Contact_Affiliation}',
                    Inclusion_Criteria = '{$trial->Inclusion_Criteria}',
                    Condition = '{$trial->Condition}',
                    Intervention = '{$trial->Intervention}',
                    Primary_outcome = '{$trial->Primary_outcome}',
                    Retrospective_flag = '{$trial->Retrospective_flag}',
                    Bridging_flag_truefalse = '{$trial->Bridging_flag_truefalse}',
                    Bridged_type = '{$trial->Bridged_type}'
                WHERE
                    TrialID = '{$trialID}'
            ";
            $q = $dbConn->prepare($sql);
            $q->execute();
        } else {
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
                    Contact_Email,
                    Contact_Tel,
                    Contact_Affiliation,
                    Inclusion_Criteria,
                    Condition,
                    Intervention,
                    Primary_outcome,
                    Retrospective_flag,
                    Bridging_flag_truefalse,
                    Bridged_type
                )
                VALUES (
                    '{$trial->TrialID}',
                    '{$trial->Last_Refreshed_on}',
                    '{$trial->Public_title}',
                    '{$trial->Scientific_title}',
                    '{$trial->Acronym}',
                    '{$trial->Primary_sponsor}',
                    '{$trial->Date_registration}',
                    '{$trial->Date_registration3}',
                    '{$trial->Export_date}',
                    '{$trial->Source_Register}',
                    '{$trial->web_address}',
                    '{$trial->Recruitment_Status}',
                    '{$trial->other_records}',
                    '{$trial->Inclusion_agemin}',
                    '{$trial->Inclusion_agemax}',
                    '{$trial->Inclusion_gender}',
                    '{$trial->Date_enrollement}',
                    '{$trial->Target_size}',
                    '{$trial->Study_type}',
                    '{$trial->Study_design}',
                    '{$trial->Phase}',
                    '{$trial->Countries}',
                    '{$trial->Contact_Firstname}',
                    '{$trial->Contact_Lastname}',
                    '{$trial->Contact_Email}',
                    '{$trial->Contact_Tel}',
                    '{$trial->Contact_Affiliation}',
                    '{$trial->Inclusion_Criteria}',
                    '{$trial->Condition}',
                    '{$trial->Intervention}',
                    '{$trial->Primary_outcome}',
                    '{$trial->Retrospective_flag}',
                    '{$trial->Bridging_flag_truefalse}',
                    '{$trial->Bridged_type}'
                )
            ";
            $q = $dbConn->prepare($sql);
            $q->execute();
        }
    }
}

function parseCSV($file) {
    $dbConn = connect();
    $fileHandler = fopen($file, 'r');

    $header = fgetcsv($fileHandler, 1000, ',');

    while($row = fgetcsv($fileHandler, 1000, ',')) {
        $trial = array_combine($header, $row);
        $trial = json_encode($trial);
        $trial = str_replace("'", "\'", $trial);
        $trial = json_decode($trial, true);
        //var_dump($trial);

        $trialID = $trial['TrialID'];
        if (!$trialID) {
            continue;
        }

        $sql = "
            SELECT *
            FROM trials
            WHERE TrialID = '{$trialID}'
        ";
        $q = $dbConn->prepare($sql);
        $q->execute();
        $q->setFetchMode(PDO::FETCH_ASSOC);
        $result = $q->fetch();

        if ($result) {
            $sql = "
                UPDATE
                    trials
                SET
                    Last_Refreshed_on = '{$trial['Last Refreshed on']}',
                    Public_title = '{$trial['Public title']}',
                    Scientific_title = '{$trial['Scientific title']}',
                    Acronym = '{$trial['Acronym']}',
                    Primary_sponsor = '{$trial['Primary sponsor']}',
                    Date_registration = '{$trial['Date registration']}',
                    Date_registration3 = '{$trial['Date registration3']}',
                    Export_date = '{$trial['Export date']}',
                    Source_Register = '{$trial['Source Register']}',
                    web_address = '{$trial['web address']}',
                    Recruitment_status = '{$trial['Recruitment Status']}',
                    other_records = '{$trial['other records']}',
                    Inclusion_agemin = '{$trial['Inclusion agemin']}',
                    Inclusion_agemax = '{$trial['Inclusion agemax']}',
                    Inclusion_gender = '{$trial['Inclusion gender']}',
                    Date_enrollement = '{$trial['Date enrollement']}',
                    Target_size = '{$trial['Target size']}',
                    Study_type = '{$trial['Study type']}',
                    Study_design = '{$trial['Study design']}',
                    Phase = '{$trial['Phase']}',
                    Countries = '{$trial['Countries']}',
                    Contact_Firstname = '{$trial['Contact Firstname']}',
                    Contact_Lastname = '{$trial['Contact Lastname']}',
                    Contact_Address = '{$trial['Contact Address']}',
                    Contact_Email = '{$trial['Contact Email']}',
                    Contact_Tel = '{$trial['Contact Tel']}',
                    Contact_Affiliation = '{$trial['Contact Affiliation']}',
                    Inclusion_Criteria = '{$trial['Inclusion Criteria']}',
                    Exclusion_Criteria = '{$trial['Exclusion Criteria']}',
                    Condition = '{$trial['Condition']}',
                    Intervention = '{$trial['Intervention']}',
                    Primary_outcome = '{$trial['Primary outcome']}',
                    results_date_posted = '{$trial['results date posted']}',
                    results_date_completed = '{$trial['results date completed']}',
                    results_url_link = '{$trial['results url link']}',
                    Retrospective_flag = '{$trial['Retrospective flag']}',
                    Bridging_flag_truefalse = '{$trial['Bridging flag truefalse']}',
                    Bridged_type = '{$trial['Bridged type']}',
                    results_yes_no = '{$trial['results yes no']}'
                WHERE
                    TrialID = '{$trialID}'
            ";
        } else {
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
                    '{$trial['TrialID']}',
                    '{$trial['Last Refreshed on']}',
                    '{$trial['Public title']}',
                    '{$trial['Scientific title']}',
                    '{$trial['Acronym']}',
                    '{$trial['Primary sponsor']}',
                    '{$trial['Date registration']}',
                    '{$trial['Date registration3']}',
                    '{$trial['Export date']}',
                    '{$trial['Source Register']}',
                    '{$trial['web address']}',
                    '{$trial['Recruitment Status']}',
                    '{$trial['other records']}',
                    '{$trial['Inclusion agemin']}',
                    '{$trial['Inclusion agemax']}',
                    '{$trial['Inclusion gender']}',
                    '{$trial['Date enrollement']}',
                    '{$trial['Target size']}',
                    '{$trial['Study type']}',
                    '{$trial['Study design']}',
                    '{$trial['Phase']}',
                    '{$trial['Countries']}',
                    '{$trial['Contact Firstname']}',
                    '{$trial['Contact Lastname']}',
                    '{$trial['Contact Address']}',
                    '{$trial['Contact Email']}',
                    '{$trial['Contact Tel']}',
                    '{$trial['Contact Affiliation']}',
                    '{$trial['Inclusion Criteria']}',
                    '{$trial['Exclusion Criteria']}',
                    '{$trial['Condition']}',
                    '{$trial['Intervention']}',
                    '{$trial['Primary outcome']}',
                    '{$trial['results date posted']}',
                    '{$trial['results date completed']}',
                    '{$trial['results url link']}',
                    '{$trial['Retrospective flag']}',
                    '{$trial['Bridging flag truefalse']}',
                    '{$trial['Bridged type']}',
                    '{$trial['results yes no']}'
                )
            ";
            $q = $dbConn->prepare($sql);
            $q->execute();
        }
    }

    fclose($fileHandler);

}

if ($method == 'POST') {
    $file = $_FILES['file']['tmp_name'];
    $array = explode('.', $_FILES['file']['name']);
    $ext = end($array);
    if ($ext == 'xml') {
        parseXML($file);
    } else if ($ext == 'csv') {
        parseCSV($file);
    } else {
        header('HTTP/1.1 400 Bad Request');
        exit();
    }

    $dbConn = connect();
    date_default_timezone_set('America/Mexico_City');
    $date = date('d/m/Y h:i a', time());

    $sql = "
        UPDATE last_update
        SET last_update = '{$date}'
    ";
    $q = $dbConn->prepare($sql);
    $q->execute();

    header('HTTP/1.1 200 OK');
    exit();
}

header('HTTP/1.1 400 Bad Request');
