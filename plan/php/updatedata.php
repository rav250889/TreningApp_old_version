<?php

include "../../connection.php";

$login = $_POST['login'];

$counter = $_POST['counter'];

$day = $_POST['day'];

$workout = $_POST['workout'];

$series = $_POST['series'];

$repetitions = $_POST['repetitions'];

if($day == "poniedziałek")
{
    mysqli_query($link, "UPDATE poniedzialek SET id=(select id from login where name='$login'), type='$workout', series='$series', repetitions='$repetitions' where counter='$counter'");
}

else if($day == "środa")
{
    mysqli_query($link, "UPDATE sroda SET id=(select id from login where name='$login'), type='$workout', series='$series', repetitions='$repetitions' where counter='$counter'");
}

else if($day == "piątek")
{
    mysqli_query($link, "UPDATE piatek SET id=(select id from login where name='$login'), type='$workout', series='$series', repetitions='$repetitions' where counter='$counter'");
}

else
{
   mysqli_query($link, "UPDATE $day SET id=(select id from login where name='$login'), type='$workout', series='$series', repetitions='$repetitions' where counter='$counter'");
}

mysqli_close($link);

?>