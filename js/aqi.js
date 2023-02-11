function getData(isKiosk, isCDSCOnly) {
	fetch('data/cdsc.json')
	  .then(response => response.json())
	  .then(data => displayData(data));
}

function displayData(inData) {
	console.log(inData);
	document.getElementById("time").innerHTML = inData.time;

    setColor(inData.aqi, "body");
    setIcon(inData.aqi);
    setFontColor(inData.aqi);

	
	document.getElementById("AQIkiosk").innerHTML = inData.aqi;
	document.getElementById("pm25").innerHTML = inData.pm25 + " µg/m³";
	setAction(inData.aqi);
	setStyle(inData.aqi);
	//setFontSize(inData.aqi);
	setIcon(inData.aqi);

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

function setAction(aqivalue) {
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
		"action": "Keine Einschränkungen"
	},
	"1": {
		"colordesc": "Moderat (AQI 50 - 99)",
		"action": "Keine Einschränkungen"
	},
	"2": {
		"colordesc": "Ungesund für sensible Gruppen (AQI 100 - 149)",
		"action": "<ul><li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.</li><li>Sportunterricht & AGs finden nur mit geringen Belastungen statt.</li><li>Außenaktivitäten im Kindergarten finden nur in einem geringen Umfang statt.</li></ul>"
	},
	"3": {
		"colordesc": "Ungesund (AQI 150 - 199)",
		"action": "<ul><li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.</li><li>Alle halten sich nach Möglichkeit in geschlossenen Räumen auf.</li><li>Sport AGs im Freien und evtl. CMAC-Veranstaltungen entfallen.</li><li>Das Essen erfolgt im Klassenraum.</li><li>Alle halten sich in geschlossenen Räumen auf.</li></ul>"
	},
	"4": {
		"colordesc": "Sehr Ungesund (AQI 200 - 299)",
		"action": "<ul><li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.</li><li>Geschlossene Räume werden nur in Ausnahmefällen (wie z.B. Raumwechsel, Toilettengang, kurzer Gang zur Kantine) verlassen.</li><li>Der Sportunterricht findet im Geräteraum statt.</li><li>Die Sport AGs entfallen.</li><li>Schutzmasken sollen getragen werden.</li></ul>"
	},
	"5": {
		"colordesc": "Gesundheitsschädigend (AQI 300 - 349)",
		"action": "<ul><li>Fenster und Türen geschlossen halten. Klimaanlagen werden eingeschaltet.</li><li>Geschlossene Räume werden nur in dringenden Ausnahmefällen (wie z.B. Raumwechsel, Toilettengang) verlassen.</li><li>Schutzmasken werden nach Möglichkeit getragen.</li><li>Der Sportunterricht findet im Geräteraum statt.</li><li>Die Sport AGs entfallen.</li><li>Schutzmasken sollen getragen werden.</li><li>Evtl. Schulschluss um 13:05 Uhr.</li></ul>"
	},
	"6": {
		"colordesc": "Gefährlich (AQI ab 350)",
		"action": "Evtl. schulfrei."
	},
	"7": {
		"colordesc": "Offline!",
		"action": "Offline!"
	}
}
