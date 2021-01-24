<?php
    require_once '../baglan.php';
    $id = $_GET['id'];
    $ders = $db->query('SELECT * FROM dersler where siraNo = ' . $id);
    $arrayResponse = $ders->fetch(PDO::FETCH_ASSOC);
    $jsonResponse = json_encode($arrayResponse);
    echo $jsonResponse;