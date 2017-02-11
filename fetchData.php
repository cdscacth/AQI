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

    $params36 = array('action' => $action, 'paramValue' => $paramValue, 'endDate' => $endDate, 'startDate' => $startDate, 'stationId' => $stationId36, 'reportType' => $reportType, 'startTime' => $startTime, 'endTime' => $endTime, 'dataReportType' => $dataReportType, 'showNumRow' => $showNumRow, 'pageNo' => $pageNo,);
    
    $options36 = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($params36),
            'timeout' => 2,
        ),
    );
    
    $context36  = stream_context_create($options36);
    
    $result36 = file_get_contents($url, false, $context36);

    if ($result36) {
        $xml36 = new DOMDocument;
        $xml36->loadXML($result36);
        $tdAnzahl36 = $xml36->getElementsByTagName('td')->length;
        
        $pm25td36 = $tdAnzahl36 - 16;
        $_36pm25 = $xml36->getElementsByTagName('td')->item($pm25td36)->nodeValue;
        
        $pm10td36 = $tdAnzahl36 - 17;
        $_36pm10 = $xml36->getElementsByTagName('td')->item($pm10td36)->nodeValue;
        
        $zeittd = $tdAnzahl36 - 18;
        $_36zeit = $xml36->getElementsByTagName('td')->item($zeittd)->nodeValue;
    } else {
        $_36zeit = "-";
        $_36pm25 = "-";
        $_36pm10 = "-";
    }

    //GIS
    $resultgis = file_get_contents("http://aq.ajosoft.com/getdata.php?StationID=2052&days=1", false);
    $GISarray = explode(", ", $resultgis);
    $GISzeit = substr($GISarray[8], 5);
    if (count($GISarray) > 9) {
    	$GISpm10 = $GISarray[9];
	    $GISaqi10 = $GISarray[10];
	    $GISpm25 = $GISarray[11];
	    $GISaqi25 = $GISarray[12];
    } else {
    	$GISpm10 = "-";
	    $GISaqi10 = "-";
	    $GISpm25 = "-";
	    $GISaqi25 = "-";
    }

	//CDSC
    $resultcdsc = file_get_contents("http://aq.ajosoft.com/getdata.php?StationID=2053&days=1", false);
    $CDSCarray = explode(", ", $resultcdsc);
    $CDSCzeit = substr($CDSCarray[8], 5);
    if (count($CDSCarray) > 9) {
    	$CDSCpm10 = $CDSCarray[9];
	    $CDSCaqi10 = $CDSCarray[10];
	    $CDSCpm25 = $CDSCarray[11];
	    $CDSCaqi25 = $CDSCarray[12];
    } else {
    	$CDSCzeit = "-";
    	$CDSCpm10 = "-";
	    $CDSCaqi10 = "-";
	    $CDSCpm25 = "-";
	    $CDSCaqi25 = "-";
    }
    
    // _36zeit, _36pm10, _36pm25
    // GISzeit, GISpm10, GISaqi10, GISpm25, GISaqi25
    // CDSCzeit, CDSCpm10, CDSCaqi10, CDSCpm25, CDSCaqi25


    $send = $_36zeit . ";" . $_36pm25 . ";" . $_36pm10 . ";" . $CDSCzeit . ";" . $CDSCpm25 . ";" . $CDSCaqi25. ";" . $CDSCpm10 . ";" . $CDSCaqi10 . ";" . $GISzeit . ";" . $GISpm25 . ";" . $GISaqi25 . ";" . $GISpm10 . ";" . $GISaqi10;
    echo $send; 
    //echo '2017,02,03,19,00,00;100;100;2017-02-03 13:00:00;100;100;100;100;2017-02-03 13:00:00;100;100;100;100';
?>