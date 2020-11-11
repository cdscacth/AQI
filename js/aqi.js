function getData(isKiosk, isCDSCOnly) {
	fetch('data/cdsc.json')
	  .then(response => response.json())
	  .then(data => showValue(data, true));
}

function showValue(data, isKiosk) {
	displayData(data, isKiosk);
}

function displayData(inData, isKiosk) {
	console.log(inData);
	document.getElementById("time").innerHTML = inData.time;

    setColor(inData.aqi, "AQItr");
    setIcon(inData.aqi);
    setFontColor(inData.aqi);

	if (isKiosk) {
		document.getElementById("AQIkiosk").innerHTML = inData.aqi;
		setAction(inData.aqi);
		setStyle(inData.aqi);
		setFontSize(inData.aqi);
		setIcon(inData.aqi);
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
		document.getElementById("ico").setAttribute("href", "images/674ea7.png");
	} else if (aqivalue < 350) {
		document.getElementById("ico").setAttribute("href", "images/cc0000.png");
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
