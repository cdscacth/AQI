var XML = new XMLHttpRequest();

function getData() {
	var url = "fetchData.php";
	XML.onreadystatechange = showValue;
	XML.open("GET", url, true);
	XML.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	XML.send();
}

function showValue() {
	if (XML.readyState == 4) {
		var data;
		data = XML.responseText;

		var dataSplitArray = data.split(";");
		console.log(dataSplitArray);

		var _36pm25 = dataSplitArray[1];
		console.log(_36pm25);
		var _36pm10 = dataSplitArray[2];
		var zeitstr = dataSplitArray[0];

		if (zeitstr === "-") {
			var _36zeit = "aqmthai.com ist nicht verfügbar!";
		} else {
			var zeitarr = zeitstr.split(",");
			var stunde = parseFloat(zeitarr[3]) + 1;
			var _36Datum = new Date(zeitarr[0] + "-" + zeitarr[1] + "-" + zeitarr[2] + " " + stunde + ":" + zeitarr[4] + ":" + zeitarr[5]);
			_36time = _36Datum.getTime();
			if (stunde >= 10) {
				var _36zeit = "Stündlicher Wert vom <b>" + zeitarr[2] + "." + zeitarr[1] + "." + zeitarr[0] + "</b> um <b>" + stunde + ":" + zeitarr[4] + ":" + zeitarr[5] + "</b>";

			} else {
				var _36zeit = "Stündlicher Wert vom <b>" + zeitarr[2] + "." + zeitarr[1] + "." + zeitarr[0] + "</b> um <b> 0" + stunde + ":" + zeitarr[4] + ":" + zeitarr[5] + "</b>";
			}
			console.log(_36zeit);
		}

		if (_36pm25 != "-" && _36pm10 != "-") {
			_36pm25 = parseFloat(_36pm25).toFixed(2);
			_36pm10 = parseFloat(_36pm10).toFixed(2);
		}

		document.getElementById("36zeit").innerHTML = _36zeit;
		document.getElementById("36pm25").innerHTML = _36pm25;
		document.getElementById("36pm10").innerHTML = _36pm10;


		//CDSC-Werte
		var CDSCpm25 = dataSplitArray[4];
		console.log(CDSCpm25);

		var CDSCpm10 = dataSplitArray[6];
		console.log(CDSCpm10);

		var CDSCzeitstr = dataSplitArray[3];
		var CDSCDatum = new Date(CDSCzeitstr);
		CDSCDatum.setHours(CDSCDatum.getHours() + 7);
		if (CDSCzeitstr != "-") {
			var CDSCzeit = "Stündlicher Wert vom <b>" + ("0" + CDSCDatum.getDate()).slice(-2) + "." + ("0" + (CDSCDatum.getMonth() + 1)).slice(-2) + "." + CDSCDatum.getFullYear() + "</b> um <b>" + ("0" + CDSCDatum.getHours()).slice(-2) + ":" + ("0" + CDSCDatum.getMinutes()).slice(-2) + ":" + ("0" + CDSCDatum.getSeconds()).slice(-2) + "</b>";
			CDSCtime = CDSCDatum.getTime();
			//kiosk
			document.getElementById("time").innerHTML = "Wert am <b>" + ("0" + CDSCDatum.getDate()).slice(-2) + "." + ("0" + (CDSCDatum.getMonth() + 1)).slice(-2) + "." + CDSCDatum.getFullYear() + ", " + ("0" + CDSCDatum.getHours()).slice(-2) + " Uhr</b>";
		} else {
			var CDSCzeit = "CDSC-Station ist offline!";
		}

		if (CDSCpm25 != "-" && CDSCpm10 != "-") {
			CDSCpm25 = parseFloat(CDSCpm25).toFixed(2);
			CDSCpm10 = parseFloat(CDSCpm10).toFixed(2);
		}

		document.getElementById("CDSCzeit").innerHTML = CDSCzeit;
		document.getElementById("CDSCpm25").innerHTML = CDSCpm25;
		document.getElementById("CDSCpm10").innerHTML = CDSCpm10;

		//GIS-Werte
		var GISpm25 = dataSplitArray[9];
		console.log(GISpm25);

		var GISpm10 = dataSplitArray[11];
		console.log(GISpm10);

		var GISzeitstr = dataSplitArray[8];

		var GISDatum = new Date(GISzeitstr);
		GISDatum.setHours(GISDatum.getHours() + 7);

		if (GISzeitstr != "-") {
			var GISzeit = "Stündlicher Wert vom <b>" + ("0" + GISDatum.getDate()).slice(-2) + "." + ("0" + (GISDatum.getMonth() + 1)).slice(-2) + "." + GISDatum.getFullYear() + "</b> um <b>" + ("0" + GISDatum.getHours()).slice(-2) + ":" + ("0" + GISDatum.getMinutes()).slice(-2) + ":" + ("0" + GISDatum.getSeconds()).slice(-2) + "</b>";
			GIStime = GISDatum.getTime();
		} else {
			var GISzeit = "GIS-Station ist offline!";
		}

		if (GISpm25 != "-" && GISpm10 != "-") {
			GISpm25 = parseFloat(GISpm25).toFixed(2);
			GISpm10 = parseFloat(GISpm10).toFixed(2);
		}

		document.getElementById("GISzeit").innerHTML = GISzeit;
		document.getElementById("GISpm25").innerHTML = GISpm25;
		document.getElementById("GISpm10").innerHTML = GISpm10;

		//CallFunctions
		aqipm25();
		aqipm10();
		aqiavg();
		compareaqi();
	}
}

function setData(pm10, pm25) {
	document.getElementById("36pm25").innerHTML = pm25;
	document.getElementById("36pm10").innerHTML = pm10;

	document.getElementById("CDSCpm25").innerHTML = pm25;
	document.getElementById("CDSCpm10").innerHTML = pm10;

	document.getElementById("GISpm25").innerHTML = pm25;
	document.getElementById("GISpm10").innerHTML = pm10;

	//CallFunctions
	aqipm25();
	aqipm10();
	aqiavg();
	compareaqi();
}

function aqipm25() {
	calcaqi25("36pm25", "36aqi25", "AQI2536");

	calcaqi25("CDSCpm25", "CDSCaqi25", "AQI25CDSC");

	calcaqi25("GISpm25", "GISaqi25", "AQI25GIS");
}

function aqipm10() {

	calcaqi10("36pm10", "36aqi10", "AQI1036");

	calcaqi10("CDSCpm10", "CDSCaqi10", "AQI10CDSC");

	calcaqi10("GISpm10", "GISaqi10", "AQI10GIS");
}

function aqiavg() {
	var _36pm25 = document.getElementById("36aqi25").innerHTML;
	var _36pm10 = document.getElementById("36aqi10").innerHTML;
	var CDSCaqi25 = document.getElementById("CDSCaqi25").innerHTML;
	var CDSCaqi10 = document.getElementById("CDSCaqi10").innerHTML;
	var GISaqi25 = document.getElementById("GISaqi25").innerHTML;
	var GISaqi10 = document.getElementById("GISaqi10").innerHTML;
	var arrayAQI10 = [];
	var arrayAQI25 = [];

	if (_36pm25 != "Kein PM2.5-Wert") {
		var i = arrayAQI25.length;
		arrayAQI25[i] = parseFloat(_36pm25);
	}

	if (GISaqi25 != "Kein PM2.5-Wert") {
		var i = arrayAQI25.length;
		arrayAQI25[i] = parseFloat(GISaqi25);
	}

	if (_36pm10 != "Kein PM10-Wert") {
		var i = arrayAQI10.length;
		arrayAQI10[i] = parseFloat(_36pm10);
	}

	if (GISaqi10 != "Kein PM10-Wert") {
		var i = arrayAQI10.length;
		arrayAQI10[i] = parseFloat(GISaqi10);
	}

	//PM2.5
	var sumaqi25 = 0;
	for (var i = 0; i < arrayAQI25.length; i++) {
		sumaqi25 += arrayAQI25[i];
	}
	var aqiavg25 = sumaqi25 / arrayAQI25.length;

	var aqiavg25CDSC = (aqiavg25 + parseFloat(CDSCaqi25)) / 2;
	console.log(aqiavg25CDSC);

	document.getElementById("AQIavg25").innerHTML = aqiavg25CDSC.toFixed(2);

	setColor(aqiavg25CDSC, "AQI25tr");

	//PM10
	var sumaqi10 = 0;
	for (var i = 0; i < arrayAQI10.length; i++) {
		sumaqi10 += arrayAQI10[i];
	}
	var aqiavg10 = sumaqi10 / arrayAQI10.length;

	var aqiavg10CDSC = (aqiavg10 + parseFloat(CDSCaqi10)) / 2;
	console.log(aqiavg10CDSC);

	document.getElementById("AQIavg10").innerHTML = aqiavg10CDSC.toFixed(2);

	setColor(aqiavg10CDSC, "AQI10tr");
}

function compareaqi() {
	var aqiavg10 = document.getElementById("AQIavg10").innerHTML;
	var aqiavg25 = document.getElementById("AQIavg25").innerHTML;

	var aqi = Math.max(aqiavg10, aqiavg25);
	console.log(aqi);
	if (isNaN(aqi)) {
		document.getElementById("AQI").innerHTML = "Offline!";
	} else {
		document.getElementById("AQI").innerHTML = aqi.toFixed(2);
	}
	setColor(aqi, "AQItr");
	setColor(aqi, "info-header");
	setColor(aqi, "info-footer");

	setIcon();

	if (aqi < 50) {
		document.getElementById("colordesc").innerHTML = "Gut (AQI bis 49)";
		document.getElementById("action").innerHTML = "Keine Einschränkungen.";
		document.getElementById("action").style.textAlign = "center";
		document.getElementById("action").style.paddingLeft = "0px";
		document.getElementById("actionextra").innerHTML = "-";
	} else if (aqi < 100) {
		document.getElementById("colordesc").innerHTML = "Moderat (AQI 50 - 99)";
		document.getElementById("action").innerHTML = "Keine Einschränkungen.";
		document.getElementById("action").style.textAlign = "center";
		document.getElementById("action").style.paddingLeft = "0px";
		document.getElementById("actionextra").innerHTML = "-";
	} else if (aqi < 150) {
		document.getElementById("colordesc").innerHTML = "Ungesund für sensible Gruppen (AQI 100 - 149)";
		document.getElementById("action").innerHTML = "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Sportunterricht / AGs finden nur mit geringen Belastungen statt!</li><li>Außenaktivitäten im Kindergarten finden nur in einem geringen Umfang statt!</li>";
		document.getElementById("action").style.textAlign = "left";
		document.getElementById("action").style.paddingLeft = "25px";
		document.getElementById("actionextra").innerHTML = "-";
	} else if (aqi < 200) {
		document.getElementById("colordesc").innerHTML = "Ungesund (AQI 150 - 199)";
		document.getElementById("action").innerHTML = "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Alle halten sich nach Möglichkeit in geschlossenen Räumen auf.</li><li>Sportunterricht findet im Klassenraum statt!</li><li>Die Sport AGs entfallen*!</li>";
		document.getElementById("action").style.textAlign = "left";
		document.getElementById("action").style.paddingLeft = "25px";
		document.getElementById("actionextra").innerHTML = "* Entscheidung und Bekanntgabe zu AGs am Nachmittag um 13:15 Uhr";
	} else if (aqi < 300) {
		document.getElementById("colordesc").innerHTML = "Sehr Ungesund (AQI 200 - 299)";
		document.getElementById("action").innerHTML = "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Geschlossene Räume werden nur in Ausnahmefällen (wie z.B. Raumwechsel, Toilettengang, kurzer Gang zur Kantine) verlassen.</li><li>Sportunterricht findet im Klassenraum statt!</li><li>Die Sport AGs entfallen!</li><li>Schutzmasken werden nach Möglichkeit getragen.</li><li>Schulschluss nach dem Mittagessen.*</li>";
		document.getElementById("action").style.textAlign = "left";
		document.getElementById("action").style.paddingLeft = "25px";
		document.getElementById("actionextra").innerHTML = "* Schulschluss ab 12:15 Uhr bzw. 13:05 Uhr und Absage der AGs, sobald der Wert am Vormittag für zwei Stunden > 250 ist. Die Kantine bleibt in Absprache mit der Schulleitung geöffnet. Das Mittagessen kann im Klassenraum eingenommen werden.";
	} else if (aqi < 350) {
		document.getElementById("colordesc").innerHTML = "Gesundheitsschädigend (AQI 300 - 399)";
		document.getElementById("action").innerHTML = "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Alle halten sich in geschlossenen Räumen auf.</li><li>Geschlossene Räume werden nur in dringenden Ausnahmefällen (wie z.B. Raumwechsel, Toilettengang) verlassen.</li><li>Sportunterricht findet im Klassenraum statt!</li><li>Schutzmasken werden zur Verfügung gestellt und nach Möglichkeit getragen.</li><li>Schulschluss zum Mittagessen.*</li>";
		document.getElementById("action").style.textAlign = "left";
		document.getElementById("action").style.paddingLeft = "25px";
		document.getElementById("actionextra").innerHTML = "* Schulschluss ab 12:15 Uhr bzw. 13:05 Uhr und Absage der AGs, sobald der Wert am Vormittag für zwei Stunden > 250 ist. Die Kantine wird in Absprache mit der Schulleitung geschlossen. GGf. kann das Mittagessen noch im Klassenraum eingenommen werden.";
	} else if (aqi >= 350) {
		document.getElementById("colordesc").innerHTML = "Gefährlich (AQI ab 400)";
		document.getElementById("action").innerHTML = "Schulfrei.*";
		document.getElementById("action").style.textAlign = "center";
		document.getElementById("action").style.paddingLeft = "0px";
		document.getElementById("actionextra").innerHTML = "* Schulfrei, wenn der Durchschnittswert von 5:00 Uhr bis 7:00 Uhr > 350 ist. Entscheidung und Bekanntgabe durch die Schulleitung um 07:15 Uhr.";
	}
}

function calcaqi25(pm25div, AQI25div, AQI25td) {
	var pm1 = 0;
	var pm2 = 12;
	var pm3 = 35.4;
	var pm4 = 55.4;
	var pm5 = 150.4;
	var pm6 = 250.4;
	var pm7 = 350.4;
	var pm8 = 500.4;

	var aqi1 = 0;
	var aqi2 = 50;
	var aqi3 = 100;
	var aqi4 = 150;
	var aqi5 = 200;
	var aqi6 = 300;
	var aqi7 = 400;
	var aqi8 = 500;

	if (document.getElementById(pm25div).innerHTML != "-") {
		var pm25 = parseFloat(document.getElementById(pm25div).innerHTML);

		if (pm25 >= pm1 && pm25 <= pm2) {
			var aqipm25 = ((aqi2 - aqi1) / (pm2 - pm1)) * (pm25 - pm1) + aqi1;
		} else if (pm25 >= pm2 && pm25 <= pm3) {
			var aqipm25 = ((aqi3 - aqi2) / (pm3 - pm2)) * (pm25 - pm2) + aqi2;
		} else if (pm25 >= pm3 && pm25 <= pm4) {
			var aqipm25 = ((aqi4 - aqi3) / (pm4 - pm3)) * (pm25 - pm3) + aqi3;
		} else if (pm25 >= pm4 && pm25 <= pm5) {
			var aqipm25 = ((aqi5 - aqi4) / (pm5 - pm4)) * (pm25 - pm4) + aqi4;
		} else if (pm25 >= pm5 && pm25 <= pm6) {
			var aqipm25 = ((aqi6 - aqi5) / (pm6 - pm5)) * (pm25 - pm5) + aqi5;
		} else if (pm25 >= pm6 && pm25 <= pm7) {
			var aqipm25 = ((aqi7 - aqi6) / (pm7 - pm6)) * (pm25 - pm6) + aqi6;
		} else if (pm25 >= pm7 && pm25 <= pm8) {
			var aqipm25 = ((aqi8 - aqi7) / (pm8 - pm7)) * (pm25 - pm7) + aqi7;
		}
		console.log(aqipm25);
		document.getElementById(AQI25div).innerHTML = aqipm25.toFixed(2);

		setColor(aqipm25, AQI25td);

	} else {
		document.getElementById(AQI25div).innerHTML = "Kein PM2.5-Wert";
		document.getElementById(AQI25td).style.backgroundColor = "white";
		document.getElementById(AQI25td).style.color = "black";
	}
}

function calcaqi10(pm10div, AQI10div, AQI10td) {
	var pm1 = 0;
	var pm2 = 54;
	var pm3 = 154;
	var pm4 = 254;
	var pm5 = 354;
	var pm6 = 424;
	var pm7 = 504;
	var pm8 = 604;

	var aqi1 = 0;
	var aqi2 = 50;
	var aqi3 = 100;
	var aqi4 = 150;
	var aqi5 = 200;
	var aqi6 = 300;
	var aqi7 = 400;
	var aqi8 = 500;

	if (document.getElementById(pm10div).innerHTML !== "-") {
		var pm10 = parseFloat(document.getElementById(pm10div).innerHTML);

		if (pm10 >= pm1 && pm10 <= pm2) {
			var aqipm10 = ((aqi2 - aqi1) / (pm2 - pm1)) * (pm10 - pm1) + aqi1;
		} else if (pm10 >= pm2 && pm10 <= pm3) {
			var aqipm10 = ((aqi3 - aqi2) / (pm3 - pm2)) * (pm10 - pm2) + aqi2;
		} else if (pm10 >= pm3 && pm10 <= pm4) {
			var aqipm10 = ((aqi4 - aqi3) / (pm4 - pm3)) * (pm10 - pm3) + aqi3;
		} else if (pm10 >= pm4 && pm10 <= pm5) {
			var aqipm10 = ((aqi5 - aqi4) / (pm5 - pm4)) * (pm10 - pm4) + aqi4;
		} else if (pm10 >= pm5 && pm10 <= pm6) {
			var aqipm10 = ((aqi6 - aqi5) / (pm6 - pm5)) * (pm10 - pm5) + aqi5;
		} else if (pm10 >= pm6 && pm10 <= pm7) {
			var aqipm10 = ((aqi7 - aqi6) / (pm7 - pm6)) * (pm10 - pm6) + aqi6;
		} else if (pm10 >= pm7 && pm10 <= pm8) {
			var aqipm10 = ((aqi8 - aqi7) / (pm8 - pm7)) * (pm10 - pm7) + aqi7;
		}
		console.log(aqipm10);
		document.getElementById(AQI10div).innerHTML = aqipm10.toFixed(2);

		setColor(aqipm10, AQI10td);

	} else {
		document.getElementById(AQI10div).innerHTML = "Kein PM10-Wert";
		document.getElementById(AQI10td).style.backgroundColor = "white";
		document.getElementById(AQI10td).style.color = "black";
	}
}

function setColor(aqivalue, AQItd) {
	if (aqivalue < 50) {
		document.getElementById(AQItd).style.backgroundColor = "#00ff00";
		document.getElementById(AQItd).style.color = "black";
	} else if (aqivalue < 100) {
		document.getElementById(AQItd).style.backgroundColor = "#ffff00";
		document.getElementById(AQItd).style.color = "black";
	} else if (aqivalue < 150) {
		document.getElementById(AQItd).style.backgroundColor = "#ff9900";
		document.getElementById(AQItd).style.color = "black";
	} else if (aqivalue < 200) {
		document.getElementById(AQItd).style.backgroundColor = "#ff0000";
		document.getElementById(AQItd).style.color = "black";
	} else if (aqivalue < 300) {
		document.getElementById(AQItd).style.backgroundColor = "#cc0000";
		document.getElementById(AQItd).style.color = "white";
	} else if (aqivalue < 400) {
		document.getElementById(AQItd).style.backgroundColor = "#674ea7";
		document.getElementById(AQItd).style.color = "white";
	} else if (aqivalue >= 400) {
		document.getElementById(AQItd).style.backgroundColor = "#000000";
		document.getElementById(AQItd).style.color = "white";
	}
}

function setIcon() {
	var aqi = parseFloat(document.getElementById("AQI").innerHTML);

	if (aqi < 50) {
		document.getElementById("ico").setAttribute("href", "images/00ff00.png");
	} else if (aqi < 100) {
		document.getElementById("ico").setAttribute("href", "images/ffff00.png");
	} else if (aqi < 150) {
		document.getElementById("ico").setAttribute("href", "images/ff9900.png");
	} else if (aqi < 200) {
		document.getElementById("ico").setAttribute("href", "images/ff0000.png");
	} else if (aqi < 300) {
		document.getElementById("ico").setAttribute("href", "images/cc0000.png");
	} else if (aqi < 400) {
		document.getElementById("ico").setAttribute("href", "images/674ea7.png");
	} else if (aqi >= 400) {
		document.getElementById("ico").setAttribute("href", "images/000000.png");
	}
}

function chart() {
	var xml = new XMLHttpRequest();
	var url = "fetchDataChart.php";
	var chartload = 0;
	var CDSCchart

	xml.onreadystatechange = function() {
		if (xml.readyState == 4 && xml.status == 200) {
			var dataCDSC = JSON.parse(xml.responseText);
			var j = dataCDSC.length / 3;
			console.log(j);
			var labels = [];
			var pm25data = [];
			var pm10data = [];

			for (var i = 0; i < j; i++) {
				var time = dataCDSC[0 + 3 * i] + "+00";
				labels.push(time);
			}
			labels.reverse();

			for (var i = 0; i < j; i++) {
				var pm10 = dataCDSC[1 + 3 * i];
				pm10data.push(pm10);
			}
			pm10data.reverse();

			for (var i = 0; i < j; i++) {
				var pm25 = dataCDSC[2 + 3 * i];
				pm25data.push(pm25);
			}
			pm25data.reverse();

			if (chartload == 0) {
				var ctx = document.getElementById("ChartCDSC").getContext('2d');
				Chart.defaults.global.defaultFontFamily = "'Myriad Pro'";
				Chart.defaults.global.defaultFontSize = 15;
				document.getElementById("ChartCDSC").style.backgroundColor = "white";
				CDSCchart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: labels,
						datasets: [{
							label: 'AQI PM10',
							data: pm10data,
							backgroundColor: "rgba(0,0,255,0.4)",
							fillColor: "rgba(0,0,255,0.2)",
							strokeColor: "rgba(0,0,255,1)",
							pointColor: "rgba(0,0,255,1)",
							pointStrokeColor: "#fff",
						}, {
							label: 'AQI PM2.5',
							data: pm25data,
							backgroundColor: "rgba(255,0,0,0.4)",
							fillColor: "rgba(255,0,0,0.2)",
							strokeColor: "rgba(255,0,0,1)",
							pointColor: "rgba(255,0,0,1)",
							pointStrokeColor: "#fff",
						}]
					},
					options: {
						title: {
							display: true,
							text: "CDSC: AQI der letzten 24 Stunden",
							fontSize: 30
						},
						scales: {
							xAxes: [{
								type: 'time',
								time: {
									displayFormats: {
										hour: 'HH:mm'
									},
									unit: "hour"
								}
							}]
						}
					}
				});
				chartload = 1;
				console.log('CDSCchart geladen.');
			} else {
				CDSCchart.data.labels = labels;
				CDSCchart.data.datasets[0].data = pm10data;
				CDSCchart.data.datasets[1].data = pm25data;
				CDSCchart.update();
			}


		}
	};
	xml.open("GET", url, true);
	xml.send();
}