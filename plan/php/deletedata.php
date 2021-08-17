<?php

include "../../connection.php";

$login = $_POST['login'];

$day = $_POST['day'];

$counter = $_POST['counter'];

if($day == "poniedziałek")
{
    mysqli_query($link, "DELETE FROM poniedzialek WHERE counter='$counter' and id=(select id from login where name='$login')");
}

else if($day == "środa")
{
     mysqli_query($link, "DELETE FROM sroda WHERE counter='$counter' and id=(select id from login where name='$login')");
}

else if($day == "piątek")
{
      mysqli_query($link, "DELETE FROM piatek WHERE counter='$counter' and id=(select id from login where name='$login')");
}

else
{
   mysqli_query($link, "DELETE FROM $day WHERE counter='$counter' and id=(select id from login where name='$login')");
}

mysqli_close($link);

?>