<?php

include "../../connection.php";

$login = $_POST['login'];

$day = $_POST['day'];

$workout = $_POST['workout'];

$series = $_POST['series'];

$repetitions = $_POST['repetitions'];

if($day == "poniedziałek")
{
    mysqli_query($link, "insert into poniedzialek (id, type, series, repetitions) values ((select id from login where name='$login'), '$workout', '$series', '$repetitions')");
}

else if($day == "środa")
{
    mysqli_query($link, "insert into sroda (id, type, series, repetitions) values ((select id from login where name='$login'), '$workout', '$series', '$repetitions')");
}

else if($day == "piątek")
{
     mysqli_query($link, "insert into piatek (id, type, series, repetitions) values ((select id from login where name='$login'), '$workout', '$series', '$repetitions')");
}

else
{
   mysqli_query($link, "insert into $day (id, type, series, repetitions) values ((select id from login where name='$login'), '$workout', '$series', '$repetitions')");
}

mysqli_close($link);
?>