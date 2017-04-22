<?php
	error_reporting(E_ALL & ~E_WARNING);

	//CDSC
	$resultcdsc = file_get_contents("http://aq.ajosoft.com/getdata.php?StationID=2053&days=1", NULL, NULL, 83);
	$CDSCarray = explode(", ", $resultcdsc);
	$CDSCzeit1 = $CDSCarray[0];
	$j = count($CDSCarray) / 4 - 1;
	$sendarray = array(
		$CDSCzeit1
	);

	if (count($CDSCarray) > 1) {
		$CDSCaqi10 = $CDSCarray[2];
		$CDSCaqi25 = $CDSCarray[4];
	}
	else {
		$CDSCzeit = "-";
		$CDSCaqi10 = "-";
		$CDSCaqi25 = "-";
	}

	for ($i = 0; $i < $j; $i++) {
		if ($i != 0) {
			$CDSCzeit = strstr($CDSCarray[4 * $i], "201");
			array_push($sendarray, $CDSCzeit);
		}

		$CDSCaqi10 = $CDSCarray[2 + 4 * $i];
		$CDSCaqi25 = strstr($CDSCarray[4 + 4 * $i], "\n\r", true);
		array_push($sendarray, $CDSCaqi10, $CDSCaqi25);
	}

	echo json_encode($sendarray);
?>