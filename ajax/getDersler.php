<?php
    

    require_once '../baglan.php';

    // tüm elemanları getir
    $dersler = $db->query('SELECT * FROM dersler');
    $arrayResponse = $dersler->fetchAll(PDO::FETCH_ASSOC);
    $jsonResponse = json_encode($arrayResponse);
    echo $jsonResponse;

    // tek eleman getir
    //$ders = $db->query('SELECT * FROM dersler WHERE siraNo = 2');
    //print_r($ders->fetch(PDO::FETCH_ASSOC));

    // fetch assoc hem id => 1 hem  0=>1 olmasını engelliyor
    // arrayin indexed kısımlarını siliyor

