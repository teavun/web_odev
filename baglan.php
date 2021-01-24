<?php

//veritabanı bağlantısı
try{
    $db = new PDO("mysql:host=localhost;dbname=ders;", 'root' ,'');
}catch(PDOException $e){
    echo $e->getMessage();
}

