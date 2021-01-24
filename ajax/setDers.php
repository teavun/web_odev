<?php

    require_once '../baglan.php';

    $type = $_GET['type'];
    $val = $_GET['val'];
    $id = $_GET['id'];

    $query = 'UPDATE dersler SET ' . $type . ' = "' . $val . '" WHERE siraNo = ' . $id;
    if ($db->query($query) == TRUE) {
        echo "Güncelleme Başarılı";
    } else {
        echo "Hatalı Güncelleme" ;
    }