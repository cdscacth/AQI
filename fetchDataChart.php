<?php
    error_reporting(E_ALL & ~E_WARNING);
	//CDSC
    $resultcdsc = file_get_contents("http://aq.ajosoft.com/getdata.php?StationID=2053&days=1", false);
    $CDSCarray = explode(", ", $resultcdsc);
    $CDSCzeit1 = substr($CDSCarray[8], 5);

    $j = count($CDSCarray) / 8 - 2;
    $sendarray = array($CDSCzeit1);

    if (count($CDSCarray) > 9) {
	    $CDSCaqi10 = $CDSCarray[10];
	    $CDSCaqi25 = $CDSCarray[12];
    } else {
    	$CDSCzeit = "-";
    	$CDSCpm10 = "-";
	    $CDSCaqi10 = "-";
	    $CDSCpm25 = "-";
	    $CDSCaqi25 = "-";
    }

    for ($i = 0; $i < $j; $i++) { 
        if ($i != 0) {
            $CDSCzeit = substr($CDSCarray[8 + 8 * $i], 3);
            array_push($sendarray, $CDSCzeit);
        }
        
        $CDSCaqi10 = $CDSCarray[10 + 8 * $i];
        $CDSCaqi25 = $CDSCarray[12 + 8 * $i];

        array_push($sendarray, $CDSCaqi10, $CDSCaqi25);
    }

    echo json_encode($sendarray);
?>