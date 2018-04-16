var XML = new XMLHttpRequest();
var firstRequest = 1;

function getData(isKiosk, isCDSCOnly) {
	//{"station36":{"time":"2017,04,29,19,00,00","pm25":12,"pm10":43,"online":1},"cdsc":{"time":2017,"pm25":18,"pm10":25,"aqi25":64,"aqi10":23,"online":1},"gis":{"time":0,"pm25":0,"pm10":0,"aqi25":0,"aqi10":0,"online":0}}
	var url = "fetchData.php";
	XML.onreadystatechange = function(){showValue(isKiosk)};
	XML.open("GET", url, true);
	XML.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	XML.send();
}

function showValue(isKiosk) {
	if (XML.readyState == 4) {
		var data = {};
		data = JSON.parse(XML.responseText);

		//Station 36
		if (data.station36.online === 0) {
			data.station36.time = "36t-Station ist offline!";
		} else {
			var zeitarr = data.station36.time.split(",");
			var stunde = parseFloat(zeitarr[3]) + 1;
			var _36Datum = new Date(zeitarr[0] + "-" + zeitarr[1] + "-" + zeitarr[2] + " " + stunde + ":" + zeitarr[4] + ":" + zeitarr[5]);
			_36time = _36Datum.getTime();
			if (stunde >= 10) {
				data.station36.time = "Stündlicher Wert vom <b>" + zeitarr[2] + "." + zeitarr[1] + "." + zeitarr[0] + "</b> um <b>" + stunde + ":" + zeitarr[4] + ":" + zeitarr[5] + "</b>";
			} else {
				data.station36.time = "Stündlicher Wert vom <b>" + zeitarr[2] + "." + zeitarr[1] + "." + zeitarr[0] + "</b> um <b> 0" + stunde + ":" + zeitarr[4] + ":" + zeitarr[5] + "</b>";
			}
			localforage.setItem("station36", data.station36);
		}

		if (firstRequest == 0 && data.station36.online === 0) {
			localforage.getItem("station36", function (err, value) {
				if(!err) {
					data["station36"] = value;
				}
			});
		}

		//CDSC-Werte
		if (data.cdsc.online === 0) {
			data.cdsc.time = "CDSC-Station ist offline!";
		} else {
			var CDSCDatum = new Date(data.cdsc.time);
			data.cdsc.time = "Stündlicher Wert vom <b>" + ("0" + CDSCDatum.getDate()).slice(-2) + "." + ("0" + (CDSCDatum.getMonth() + 1)).slice(-2) + "." + CDSCDatum.getFullYear() + "</b> um <b>" + ("0" + CDSCDatum.getHours()).slice(-2) + ":" + ("0" + CDSCDatum.getMinutes()).slice(-2) + ":" + ("0" + CDSCDatum.getSeconds()).slice(-2) + "</b>";
			CDSCtime = CDSCDatum.getTime();
			//kiosk
			data.cdsc.kiosk = "Wert am <b>" + ("0" + CDSCDatum.getDate()).slice(-2) + "." + ("0" + (CDSCDatum.getMonth() + 1)).slice(-2) + "." + CDSCDatum.getFullYear() + ", " + ("0" + CDSCDatum.getHours()).slice(-2) + ":" + ("0" + CDSCDatum.getMinutes()).slice(-2) + " Uhr</b>";

			localforage.setItem("cdsc", data.cdsc);
		}

		if (firstRequest == 0 && data.cdsc.online === 0) {
			localforage.getItem("cdsc", function (err, value) {
				if(!err) {
					data["cdsc"] = value;
				}
			});
		}

		//GIS-Werte
		var GISDatum = new Date(data.gis.time);
		GISDatum.setHours(GISDatum.getHours() + 7);

		if (data.gis.online === 1) {
			data.gis.time = "Stündlicher Wert vom <b>" + ("0" + GISDatum.getDate()).slice(-2) + "." + ("0" + (GISDatum.getMonth() + 1)).slice(-2) + "." + GISDatum.getFullYear() + "</b> um <b>" + ("0" + GISDatum.getHours()).slice(-2) + ":" + ("0" + GISDatum.getMinutes()).slice(-2) + ":" + ("0" + GISDatum.getSeconds()).slice(-2) + "</b>";
			GIStime = GISDatum.getTime();
			localforage.setItem("gis", data.gis);
		} else {
			data.gis.time = "GIS-Station ist offline!";
		}

		if (firstRequest == 0 && data.gis.online === 0) {
			localforage.getItem("gis", function (err, value) {
				if(!err) {
					data["gis"] = value;
				}
			});
		}
		firstRequest = 0;

		displayData(data, false, isKiosk);
	}
}

function displayData(inData, isCDSCOnly, isKiosk) {
	console.log(inData, isCDSCOnly);

	if (isKiosk) {
		var time = new Date(inData.time);
		document.getElementById("time").innerHTML = inData.cdsc.kiosk;
	} else if (isCDSCOnly) {
    document.getElementById("CDSCzeit").innerHTML = inData.time;
		document.getElementById("CDSCpm25").innerHTML = (inData.pm25 === 0) ? "Kein PM2.5 Wert" : inData.pm25;
		document.getElementById("CDSCpm10").innerHTML = (inData.pm25 === 0) ? "Kein PM10 Wert" : inData.pm10;
		document.getElementById("CDSCaqi25").innerHTML = calcaqi25(inData.pm25);
		document.getElementById("CDSCaqi10").innerHTML = calcaqi10(inData.pm10);
		setColor(calcaqi25(inData.pm25), "AQI25CDSC");
		setColor(calcaqi10(inData.pm10), "AQI10CDSC");
  } else {
		//Station 36
		document.getElementById("36zeit").innerHTML = inData.station36.time;
		document.getElementById("36pm25").innerHTML = (inData.station36.pm25 === 0) ? "Kein PM2.5 Wert" : inData.station36.pm25;
		document.getElementById("36pm10").innerHTML = (inData.station36.pm25 === 0) ? "Kein PM10 Wert" : inData.station36.pm10;
		document.getElementById("36aqi25").innerHTML = calcaqi25(inData.station36.pm25);
		document.getElementById("36aqi10").innerHTML = calcaqi10(inData.station36.pm10);
		setColor(calcaqi25(inData.station36.pm25), "AQI2536");
		setColor(calcaqi10(inData.station36.pm10), "AQI1036");

		//CDSC
		document.getElementById("CDSCzeit").innerHTML = inData.cdsc.time;
		document.getElementById("CDSCpm25").innerHTML = (inData.cdsc.pm25 === 0) ? "Kein PM2.5 Wert" : inData.cdsc.pm25;
		document.getElementById("CDSCpm10").innerHTML = (inData.cdsc.pm25 === 0) ? "Kein PM10 Wert" : inData.cdsc.pm10;
		document.getElementById("CDSCaqi25").innerHTML = calcaqi25(inData.cdsc.pm25);
		document.getElementById("CDSCaqi10").innerHTML = calcaqi10(inData.cdsc.pm10);
		setColor(calcaqi25(inData.cdsc.pm25), "AQI25CDSC");
		setColor(calcaqi10(inData.cdsc.pm10), "AQI10CDSC");

		//GIS
		document.getElementById("GISzeit").innerHTML = inData.gis.time;
		document.getElementById("GISpm25").innerHTML = (inData.gis.pm25 === 0) ? "Kein PM2.5 Wert" : inData.gis.pm25;
		document.getElementById("GISpm10").innerHTML = (inData.gis.pm25 === 0) ? "Kein PM10 Wert" : inData.gis.pm10;
		document.getElementById("GISaqi25").innerHTML = calcaqi25(inData.gis.pm25);
		document.getElementById("GISaqi10").innerHTML = calcaqi10(inData.gis.pm10);
		setColor(calcaqi25(inData.gis.pm25), "AQI25GIS");
		setColor(calcaqi10(inData.gis.pm10), "AQI10GIS");
	}

  //Average AQI
  if (isCDSCOnly) {
    var avg = aqiavg(inData.pm25, inData.pm10);
  } else {
    var avg = aqiavg(inData.cdsc.pm25, inData.cdsc.pm10);
  }

  setColor(avg.aqi, "AQItr");
  setIcon(avg.aqi);
  setFontColor(avg.aqi);

  if (isKiosk) {
    document.getElementById("AQIkiosk").innerHTML = avg.kiosk;
    setAction(avg.aqi);
    setStyle(avg.aqi);
    setFontSize(avg.aqi);
    setIcon(avg.aqi);
  } else {
    document.getElementById("AQI").innerHTML = avg.aqi;
    setColor(avg.aqi, "info-header");
    setColor(avg.aqi, "info-footer");
    setAction(avg.aqi, "main");
    setStyle(avg.aqi, "main");
  }
}

function aqiavg(pm25, pm10) {
	var CDSCaqi25 = calcaqi25(pm25);
	var CDSCaqi10 = calcaqi10(pm10);

	//Compare AQIs
  var aqi = Math.max(CDSCaqi10, CDSCaqi25);
	//console.log(aqi);
	if (isNaN (aqi) || aqi == 0) {
		return {"aqi": "Offline!", "kiosk": "Offline!"}
	} else {
		 return {"aqi": aqi.toFixed(2), "kiosk": aqi.toFixed(0)}
	}
}

function calcaqi25(pm25) {
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

	var aqipm25 = 0;

	if (pm25 != 0) {
		if (pm25 >= pm1 && pm25 <= pm2) {
			aqipm25 = ((aqi2 - aqi1) / (pm2 - pm1)) * (pm25 - pm1) + aqi1;
		} else if (pm25 >= pm2 && pm25 <= pm3) {
			aqipm25 = ((aqi3 - aqi2) / (pm3 - pm2)) * (pm25 - pm2) + aqi2;
		} else if (pm25 >= pm3 && pm25 <= pm4) {
			aqipm25 = ((aqi4 - aqi3) / (pm4 - pm3)) * (pm25 - pm3) + aqi3;
		} else if (pm25 >= pm4 && pm25 <= pm5) {
			aqipm25 = ((aqi5 - aqi4) / (pm5 - pm4)) * (pm25 - pm4) + aqi4;
		} else if (pm25 >= pm5 && pm25 <= pm6) {
			aqipm25 = ((aqi6 - aqi5) / (pm6 - pm5)) * (pm25 - pm5) + aqi5;
		} else if (pm25 >= pm6 && pm25 <= pm7) {
			aqipm25 = ((aqi7 - aqi6) / (pm7 - pm6)) * (pm25 - pm6) + aqi6;
		} else if (pm25 >= pm7 && pm25 <= pm8) {
			aqipm25 = ((aqi8 - aqi7) / (pm8 - pm7)) * (pm25 - pm7) + aqi7;
		}
		return aqipm25.toFixed(2)
	} else {
		 return "Kein PM2.5-Wert"
	}
}

function calcaqi10(pm10) {
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

	var aqipm10 = 0;

	if (pm10 != 0) {
		if (pm10 >= pm1 && pm10 <= pm2) {
			aqipm10 = ((aqi2 - aqi1) / (pm2 - pm1)) * (pm10 - pm1) + aqi1;
		} else if (pm10 >= pm2 && pm10 <= pm3) {
			aqipm10 = ((aqi3 - aqi2) / (pm3 - pm2)) * (pm10 - pm2) + aqi2;
		} else if (pm10 >= pm3 && pm10 <= pm4) {
			aqipm10 = ((aqi4 - aqi3) / (pm4 - pm3)) * (pm10 - pm3) + aqi3;
		} else if (pm10 >= pm4 && pm10 <= pm5) {
			aqipm10 = ((aqi5 - aqi4) / (pm5 - pm4)) * (pm10 - pm4) + aqi4;
		} else if (pm10 >= pm5 && pm10 <= pm6) {
			aqipm10 = ((aqi6 - aqi5) / (pm6 - pm5)) * (pm10 - pm5) + aqi5;
		} else if (pm10 >= pm6 && pm10 <= pm7) {
			aqipm10 = ((aqi7 - aqi6) / (pm7 - pm6)) * (pm10 - pm6) + aqi6;
		} else if (pm10 >= pm7 && pm10 <= pm8) {
			aqipm10 = ((aqi8 - aqi7) / (pm8 - pm7)) * (pm10 - pm7) + aqi7;
		}
		return aqipm10.toFixed(2)
	} else {
		 return "Kein PM10-Wert"
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
		document.getElementById(AQItd).style.backgroundColor = "#540099";
		document.getElementById(AQItd).style.color = "white";
	} else if (aqivalue < 350) {
		document.getElementById(AQItd).style.backgroundColor = "#800000";
		document.getElementById(AQItd).style.color = "white";
	} else if (aqivalue >= 350) {
		document.getElementById(AQItd).style.backgroundColor = "#000000";
		document.getElementById(AQItd).style.color = "white";
	} else if (aqivalue == "Kein PM10-Wert" || aqivalue == "Kein PM2.5-Wert" || aqivalue == "Offline!") {
		document.getElementById(AQItd).style.backgroundColor = "#ffffff";
		document.getElementById(AQItd).style.color = "black";
	}
}

function setFontColor(aqivalue) {
	if (aqivalue < 200) {
		document.getElementById("time").style.color = "black";
	} else if (aqivalue < 350) {
		document.getElementById("time").style.color = "white";
	} else if (aqivalue >= 350) {
		document.getElementById("time").style.color = "white";
	} else if (aqivalue == "Kein PM10-Wert" || aqivalue == "Kein PM2.5-Wert" || aqivalue == "Offline!") {
		document.getElementById("time").style.color = "black";
	}
}

function setStyle(aqivalue, site) {
	if (aqivalue < 100) {
		document.getElementById("action").style.textAlign = "center";
		document.getElementById("action").style.paddingLeft = "0px";
	} else if (aqivalue < 350) {
		document.getElementById("action").style.textAlign = "left";
		document.getElementById("action").style.paddingLeft = "25px";
	} else if (aqivalue >= 350) {
		document.getElementById("action").style.textAlign = "center";
		document.getElementById("action").style.paddingLeft = "0px";
	} else if (aqivalue == "Kein PM10-Wert" || aqivalue == "Kein PM2.5-Wert" || aqivalue == "Offline!") {
		document.getElementById("action").style.textAlign = "center";
		document.getElementById("action").style.paddingLeft = "0px";
		if (site == "main") {
			document.getElementById("info-header").style.backgroundColor = "#008CBA";
			document.getElementById("info-header").style.color = "white";
			document.getElementById("info-footer").style.backgroundColor = "#008CBA";
			document.getElementById("info-footer").style.color = "white";
		}
	}
}

function setFontSize(aqivalue) {
	if (aqivalue < 100) {
		document.getElementById("action").style.fontSize = "250%";
	} else if (aqivalue < 150) {
		document.getElementById("action").style.fontSize = "200%";
	} else if (aqivalue < 200) {
		document.getElementById("action").style.fontSize = "175%";
	} else if (aqivalue < 350) {
		document.getElementById("action").style.fontSize = "150%";
	} else if (aqivalue >= 350) {
		document.getElementById("action").style.fontSize = "200%";
	} else if (aqivalue == "Kein PM10-Wert" || aqivalue == "Kein PM2.5-Wert" || aqivalue == "Offline!") {
		document.getElementById("action").style.fontSize = "200%";
	}
}

function setAction(aqivalue, site) {
	if (aqivalue < 50) {
		document.getElementById("action").innerHTML = action[0].action;
	} else if (aqivalue < 100) {
		document.getElementById("action").innerHTML = action[1].action;
	} else if (aqivalue < 150) {
		document.getElementById("action").innerHTML = action[2].action;
	} else if (aqivalue < 200) {
		document.getElementById("action").innerHTML = action[3].action;
	} else if (aqivalue < 300) {
		document.getElementById("action").innerHTML = action[4].action;
	} else if (aqivalue < 350) {
		document.getElementById("action").innerHTML = action[5].action;
	} else if (aqivalue >= 350) {
		document.getElementById("action").innerHTML = action[6].action;
	} else if (aqivalue == "Kein PM10-Wert" || aqivalue == "Kein PM2.5-Wert" || aqivalue == "Offline!") {
		document.getElementById("action").innerHTML = action[7].action;
	}

	if (site == "main") {
		if (aqivalue < 50) {
			document.getElementById("colordesc").innerHTML = action[0].colordesc;
			document.getElementById("actionextra").innerHTML = action[0].actionextra;
		} else if (aqivalue < 100) {
			document.getElementById("colordesc").innerHTML = action[1].colordesc;
			document.getElementById("actionextra").innerHTML = action[1].actionextra;
		} else if (aqivalue < 150) {
			document.getElementById("colordesc").innerHTML = action[2].colordesc;
			document.getElementById("actionextra").innerHTML = action[2].actionextra;
		} else if (aqivalue < 200) {
			document.getElementById("colordesc").innerHTML = action[3].colordesc;
			document.getElementById("actionextra").innerHTML = action[3].actionextra;
		} else if (aqivalue < 300) {
			document.getElementById("colordesc").innerHTML = action[4].colordesc;
			document.getElementById("actionextra").innerHTML = action[4].actionextra;
		} else if (aqivalue < 350) {
			document.getElementById("colordesc").innerHTML = action[5].colordesc;
			document.getElementById("actionextra").innerHTML = action[5].actionextra;
		} else if (aqivalue >= 350) {
			document.getElementById("colordesc").innerHTML = action[6].colordesc;
			document.getElementById("actionextra").innerHTML = action[6].actionextra;
		} else if (aqivalue == "Kein PM10-Wert" || aqivalue == "Kein PM2.5-Wert" || aqivalue == "Offline!") {
			document.getElementById("colordesc").innerHTML = action[7].colordesc;
			document.getElementById("actionextra").innerHTML = action[7].actionextra;
		}
	}
}

function setIcon(aqivalue) {
	if (aqivalue < 50) {
		document.getElementById("ico").setAttribute("href", "images/00ff00.png");
	} else if (aqivalue < 100) {
		document.getElementById("ico").setAttribute("href", "images/ffff00.png");
	} else if (aqivalue < 150) {
		document.getElementById("ico").setAttribute("href", "images/ff9900.png");
	} else if (aqivalue < 200) {
		document.getElementById("ico").setAttribute("href", "images/ff0000.png");
	} else if (aqivalue < 300) {
		document.getElementById("ico").setAttribute("href", "images/cc0000.png");
	} else if (aqivalue < 350) {
		document.getElementById("ico").setAttribute("href", "images/674ea7.png");
	} else if (aqivalue >= 350) {
		document.getElementById("ico").setAttribute("href", "images/000000.png");
	}
}

var action = {
	"0": {
		"colordesc": "Gut (AQI bis 49)",
		"action": "Keine Einschränkungen",
		"actionextra": "-"
	},
	"1": {
		"colordesc": "Moderat (AQI 50 - 99)",
		"action": "Keine Einschränkungen",
		"actionextra": "-"
	},
	"2": {
		"colordesc": "Ungesund für sensible Gruppen (AQI 100 - 149)",
		"action": "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Sportunterricht & AGs finden nur mit geringen Belastungen statt.</li><li>Außenaktivitäten im Kindergarten finden nur in einem geringen Umfang statt.</li>",
		"actionextra": "-"
	},
	"3": {
		"colordesc": "Ungesund (AQI 150 - 199)",
		"action": "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Alle halten sich nach Möglichkeit in geschlossenen Räumen auf.*</li><li>Der Sportunterricht findet im Klassenraum statt.</li><li>Die Sport AGs entfallen.**</li>",
		"actionextra": "* Die Entscheidung, ob die Andacht stattfindet oder die Klassenlehrer mit ihren Klassen in den Klassenraum gehen, wird in der Dienstbesprechung getroffen. Als Richtwert gilt ein AQI von 175.<br>** Die Entscheidung, ob die AGs stattfinden oder entfallen, wird um 13:15 Uhr von Schulleitung und Athletic Director getroffen und umgehend veröffentlicht. Gleiches gilt für CMAC Wettbewerbe."
	},
	"4": {
		"colordesc": "Sehr Ungesund (AQI 200 - 299)",
		"action": "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Geschlossene Räume werden nur in Ausnahmefällen (wie z.B. Raumwechsel, Toilettengang, kurzer Gang zur Kantine) verlassen.</li><li>Der Sportunterricht findet im Klassenraum statt.</li><li>Schutzmasken werden nach Möglichkeit getragen.</li><li>Schulschluss nach dem Mittagessen.*</li>",
		"actionextra": "* Schulschluss ab 12:15 Uhr bzw. 13:05 Uhr und Absage der AGs, sobald der Wert am Vormittag für zwei Stunden > 250 ist. Die Kantine bleibt in Absprache mit der Schulleitung geöffnet. Das Mittagessen kann im Klassenraum eingenommen werden."
	},
	"5": {
		"colordesc": "Gesundheitsschädigend (AQI 300 - 399)",
		"action": "<li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.<li>Alle halten sich in geschlossenen Räumen auf.</li><li>Geschlossene Räume werden nur in dringenden Ausnahmefällen (wie z.B. Raumwechsel, Toilettengang) verlassen.</li><li>Der Sportunterricht findet im Klassenraum statt.</li><li>Schutzmasken werden zur Verfügung gestellt und nach Möglichkeit getragen.</li><li>Schulschluss zum Mittagessen.*</li>",
		"actionextra": "* Schulschluss ab 12:15 Uhr bzw. 13:05 Uhr und Absage der AGs, sobald der Wert am Vormittag für zwei Stunden > 250 ist. Die Kantine wird in Absprache mit der Schulleitung geschlossen. Ggf. kann das Mittagessen noch im Klassenraum eingenommen werden."
	},
	"6": {
		"colordesc": "Gefährlich (AQI ab 400)",
		"action": "Schulfrei*",
		"actionextra": "* Schulfrei, wenn der Durchschnittswert von 5:00 Uhr bis 7:00 Uhr > 350 ist. Entscheidung und Bekanntgabe durch die Schulleitung und Athletic Director um 07:15 Uhr."
	},
	"7": {
		"colordesc": "Offline!",
		"action": "Offline!",
		"actionextra": "-"
	}
}

function chart() {
	var xml = new XMLHttpRequest();
	var url = "data/cdsc.json";
	var chartload = 0;
	var CDSCchart;

	xml.onreadystatechange = function() {
		if (xml.readyState == 4 && xml.status == 200) {
			var dataCDSC = JSON.parse(xml.responseText);
      displayData(dataCDSC[dataCDSC.length-1], true, false);
			var labels = [];
			var pm25data = [];
			var pm10data = [];

      for (var i = 0; i < dataCDSC.length; i++) {
				var time = dataCDSC[i].time.replace(/\//g, "-");
				labels.push(time);
        pm10data.push(calcaqi10(dataCDSC[i].pm10));
        pm25data.push(calcaqi25(dataCDSC[i].pm25));
			}

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
							text: "CDSC: AQI der letzten Stunden",
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
