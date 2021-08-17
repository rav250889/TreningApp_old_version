<?php

header("Content-type: text/xml");

header("Cache-Control: no-cache");

include "../../connection.php";

$login = $_POST['loginUser'];

$day = $_POST['day'];

if($day == "poniedziałek")
{
    $sql = "select type, series, repetitions, counter from login INNER JOIN poniedzialek on login.id=poniedzialek.id where name='$login'";
}

else if($day == "środa")
{
    $sql = "select type, series, repetitions, counter from login INNER JOIN sroda on login.id=sroda.id where name='$login'";
}

else if($day == "piątek")
{
    $sql = "select type, series, repetitions, counter from login INNER JOIN piatek on login.id=piatek.id where name='$login'";
}

else
{
    $sql = "select type, series, repetitions, counter from login INNER JOIN $day on login.id=$day.id where name='$login'";
}

$result = mysqli_query($link, $sql) or die("Bad Query: $sql");

echo "<?xml version='1.0' ?>";

	echo "<DataBase>";

	while($row = mysqli_fetch_assoc($result))
	{
        echo "<workout>";
        
		echo "<type>".$row['type']."</type>";
        
        echo "<series>".$row['series']."</series>";
        
        echo "<repetitions>".$row['repetitions']."</repetitions>";
		
		 echo "<counter>".$row['counter']."</counter>";
        
        echo "</workout>";
       
	}
	
	echo "</DataBase>";

mysqli_close($link);

?>