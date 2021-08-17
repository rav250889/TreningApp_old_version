<?php

include "../../connection.php";

$username = $_POST['username'];

$password = $_POST['password'];

mysqli_query($link, "insert into login(name) values('$username')");

mysqli_query($link, "insert into password(id, pass) values((select id from login where name='$username'), '$password')");

mysqli_close($link);
	
?>