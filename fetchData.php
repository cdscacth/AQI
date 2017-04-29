<?php
	error_reporting(E_ALL & ~E_WARNING);
	ini_set('default_socket_timeout', 5);
	date_default_timezone_set('Asia/Bangkok');
	$currentDate = date("Y-m-d");
	$endDate = $currentDate;
	$startDate = $currentDate;
	$stationId36 = "36t%%";
	$reportType = "Raw";
	$showNumRow = 100;
	$reportType = "Raw";
	$showNumRow = 100;
	$pageNo = 1;
	$paramValue = "PM10,PM2.5%%";
	$url = "http://aqmthai.com/includes/getMultiManReport.php";
	$action = "showTable";
	$startTime = "00:00:00";
	$endTime = "23:59:59";
	$dataReportType = "_h";
	$params36 = array(
		'action' => $action,
		'paramValue' => $paramValue,
		'endDate' => $endDate,
		'startDate' => $startDate,
		'stationId' => $stationId36,
		'reportType' => $reportType,
		'startTime' => $startTime,
		'endTime' => $endTime,
		'dataReportType' => $dataReportType,
		'showNumRow' => $showNumRow,
		'pageNo' => $pageNo,
	);
	$options36 = array(
		'http' => array(
			'header' => "Content-type: application/x-www-form-urlencoded\r\n",
			'method' => 'POST',
			'content' => http_build_query($params36) ,
			'timeout' => 2,
		) ,
	);
	$context36 = stream_context_create($options36);
	$result36 = file_get_contents($url, false, $context36);
	if ($result36) {
		$xml36 = new DOMDocument;
		$xml36->loadXML($result36);
		$tdAnzahl36 = $xml36->getElementsByTagName('td')->length;
		$pm25td36 = $tdAnzahl36 - 16;
		$_36pm25 = intval($xml36->getElementsByTagName('td')->item($pm25td36)->nodeValue);
		$pm10td36 = $tdAnzahl36 - 17;
		$_36pm10 = intval($xml36->getElementsByTagName('td')->item($pm10td36)->nodeValue);
		$zeittd = $tdAnzahl36 - 18;
		$_36zeit = $xml36->getElementsByTagName('td')->item($zeittd)->nodeValue;
		$_36online = 1;
	}
	else {
		$_36zeit = 0;
		$_36pm25 = 0;
		$_36pm10 = 0;
		$_36online = 0;
	}
	// CDSC
	$resultcdsc = file_get_contents("http://aq.ajosoft.com/getdata.php?StationID=2053&days=1", NULL, NULL, 83, 47);
	$CDSCarray = explode(", ", $resultcdsc);
	if (count($CDSCarray) > 1) {
		$CDSCzeit = intval($CDSCarray[0]);
		$CDSCpm10 = intval($CDSCarray[1]);
		$CDSCaqi10 = intval($CDSCarray[2]);
		$CDSCpm25 = intval($CDSCarray[3]);
		$CDSCaqi25 = intval($CDSCarray[4]);
		$CDSConline = 1;
	}
	else {
		$CDSCzeit = 0;
		$CDSCpm10 = 0;
		$CDSCaqi10 = 0;
		$CDSCpm25 = 0;
		$CDSCaqi25 = 0;
		$CDSConline = 0;
	}
	// GIS
	$resultgis = file_get_contents("http://aq.ajosoft.com/getdata.php?StationID=2052&days=1", NULL, NULL, 83, 47);
	$GISarray = explode(", ", $resultgis);
	if (count($GISarray) > 1) {
		$GISzeit = intval($GISarray[0]);
		$GISpm10 = intval($GISarray[1]);
		$GISaqi10 = intval($GISarray[2]);
		$GISpm25 = intval($GISarray[3]);
		$GISaqi25 = intval($GISarray[4]);
		$GISonline = 1;
	}
	else {
		$GISzeit = 0;
		$GISpm10 = 0;
		$GISaqi10 = 0;
		$GISpm25 = 0;
		$GISaqi25 = 0;
		$GISonline = 0;
	}
	// _36zeit, _36pm10, _36pm25
	// CDSCzeit, CDSCpm10, CDSCaqi10, CDSCpm25, CDSCaqi25
	// GISzeit, GISpm10, GISaqi10, GISpm25, GISaqi25
	$data = array("station36" => array (
									"time" => $_36zeit,
									"pm25" => $_36pm25,
									"pm10" => $_36pm10,
									"online" => $_36online
								),
								"cdsc" => array (
									"time" => $CDSCzeit,
									"pm25" => $CDSCpm25,
									"pm10" => $CDSCpm10,
									"aqi25" => $CDSCaqi25,
									"aqi10" => $CDSCaqi10,
									"online" => $CDSConline
								),
								"gis" => array (
									"time" => $GISzeit,
									"pm25" => $GISpm25,
									"pm10" => $GISpm10,
									"aqi25" => $GISaqi25,
									"aqi10" => $GISaqi10,
									"online" => $GISonline
								),
	);
	echo json_encode($data);
?>
