function fire() {
  // Get a reference to the database service
  var database = firebase.database();

  //Store in a variable the last batch of sensor data added to Firebase
  var lastChild_Rec = firebase
    .database()
    .ref("avr-iot/data/01234245A3E58A0BFE/")
    .limitToLast(1);

  //Variables for computing total health score
  var tempTotal = 0;
  var airTotal = 0;
  var lightTotal = 0;
  //Get Temperature of the last item added in firebase
  lastChild_Rec.on("child_added", function(lastdatasnap) {
    var tempVal = lastdatasnap.child("Temp").val();

    if (tempVal > 26) {
      //red for upperboud/hot temperature
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#DC143C";
      tempTotal = 20;
    } else if (tempVal < 27 && tempVal > 24) {
      //orange for non-optimal orange
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#FF6347";
      document.getElementById("tempSmsAlert").innerHTML =
        "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>SMS Alert Sent</strong> Temperature has reached the recommended threshold.</div>";
      tempTotal = 75;
    } else if (tempVal < 21 && tempVal > 18) {
      //orange for non-optimal orange
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#FF6347";
      document.getElementById("tempSmsAlert").innerHTML =
        "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>SMS Alert Sent</strong> Temperature has reached the recommended threshold.</div>";
      tempTotal = 75;
    } else if (tempVal < 20) {
      //change to blue when cold (lowerbound)
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#4787ff";
      document.getElementById("tempSmsAlert").innerHTML =
        "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>SMS Alert Sent</strong> Temperature has reached the recommended threshold.</div>";
      tempTotal = 20;
    } else {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#01cd74";
      tempTotal = 90;
    }
  });

  //Get Air Quality value of the last item added in firebase
  lastChild_Rec.on("child_added", function(lastdatasnap) {
    var AirQualityVal = lastdatasnap.child("AirQuality").val();

    if (AirQualityVal > 999) {
      //very poor air quality range (needs calibration based on sensor)
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#DC143C";
      airTotal = 20;
    } else if (AirQualityVal < 1000 && AirQualityVal > 350) {
      //poor air quality range
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#FF6347";
      airTotal = 75;
    } else {
      //Fresh air quality range
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#01cd74";
      airTotal = 90;
    }
  });

  //Get Light sensor value of the last item added in firebase
  //http://www.resourcesmart.vic.gov.au/documents/lux_meter.pdf
  lastChild_Rec.on("child_added", function(lastdatasnap) {
    var lightVal = lastdatasnap.child("Light").val();

    if (lightVal > 320) {
      //upperbound negative range - too much light
      document.getElementById("lastLight").innerText = lightVal;
      document.getElementById("statsId_light").style.borderColor = "#DC143C";
      lightTotal = 20;
    } else if (lightVal < 80) {
      //lowerbound negative range - not enough light
      document.getElementById("lastLight").innerText = lightVal;
      document.getElementById("statsId_light").style.borderColor = "#DC143C";
      lightTotal = 20;
    } else if (lightVal < 160) {
      //undersired range for office/desk areas
      document.getElementById("lastLight").innerText = lightVal;
      document.getElementById("statsId_light").style.borderColor = "#FF6347";
      lightTotal = 75;
    } else {
      //optimal range between 160 - 320
      document.getElementById("lastLight").innerText = lightVal;
      document.getElementById("statsId_light").style.borderColor = "#01cd74";
      lightTotal = 90;
    }
    function computeTotalScore() {
      //compute total score /100.
      var healthScore = Math.round((tempTotal + airTotal + lightTotal) / 3);
      document.getElementById("HealthScoreValue").innerText = healthScore;
    }
    computeTotalScore();
  });
}
