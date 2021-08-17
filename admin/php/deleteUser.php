<?php

include "../../connection.php";

$username = $_POST['username'];

mysqli_query($link, "delete from poniedziałek where id=(select id from login where name='$username')");
mysqli_query($link, "delete from wtorek where id=(select id from login where name='$username')");
mysqli_query($link, "delete from środa where id=(select id from login where name='$username')");
mysqli_query($link, "delete from czwartek where id=(select id from login where name='$username')");
mysqli_query($link, "delete from piątek where id=(select id from login where name='$username')");
mysqli_query($link, "delete from sobota where id=(select id from login where name='$username')");
mysqli_query($link, "delete from niedziela where id=(select id from login where name='$username')");
mysqli_query($link, "delete from password where id=(select id from login where name='$username')");
mysqli_query($link, "delete from login where name='$username'");

mysqli_close($link);

?>