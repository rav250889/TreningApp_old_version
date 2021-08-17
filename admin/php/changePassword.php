<?php

include "../../connection.php";

$username = $_POST['username'];

$password = $_POST['password'];

mysqli_query($link, "update password set pass='$password' where id=(select id from login where name='$username')");

mysqli_close($link);

?>