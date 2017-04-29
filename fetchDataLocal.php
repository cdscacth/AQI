<?php
	error_reporting(E_ALL & ~E_WARNING);
	ini_set('default_socket_timeout', 5);
	date_default_timezone_set('Asia/Bangkok');

	// CDSC
	$resultcdsc = file_get_contents("http://10.16.103.60/aq.html", NULL, NULL);
	$CDSCarray = explode(" ", $resultcdsc);
	if (count($CDSCarray) > 1) {
		$CDSCzeit = substr($CDSCarray[0], 3) . " " . substr($CDSCarray[1], 0, 8);
		$CDSCpm10 = $CDSCarray[18];
		$CDSCpm25 = $CDSCarray[11];
	}
	else {
		$CDSCzeit = "-";
		$CDSCpm10 = "-";
		$CDSCpm25 = "-";
	}

	// CDSCzeit, CDSCpm10, CDSCaqi10, CDSCpm25, CDSCaqi25
	$send = $CDSCzeit . ";" . $CDSCpm25 . ";" . $CDSCpm10;
	echo $send;
	//echo '2017,02,03,19,00,00;100;100;2017-02-03 13:00:00;100;100;100;100;2017-02-03 13:00:00;100;100;100;100';

?>