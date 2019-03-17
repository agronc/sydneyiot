function fire() {
  // Get a reference to the database service
  var database = firebase.database();

  /*var firebaseLight = firebase
    .database()
    .ref()
    .child("avr-iot")
    .child("data")
    .child("01230C3DB6717F1DFE")
    .child("-LWtvR_2qjabQyz3Mp4U")
    .child("Temp");
  firebaseLight.on("value", function(datasnap) {
    document.getElementById("fireLight").innerText = datasnap.val();
  });*/

  //GET last child and return val for temperature;
  var lastChild_Rec = firebase
    .database()
    .ref("avr-iot/data/01234245A3E58A0BFE/")
    .limitToLast(1);

  //Get Last TEMP
  lastChild_Rec.on("child_added", function(lastdatasnap) {
    var tempVal = lastdatasnap.child("Temp").val();

    if (tempVal > 40) {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#DC143C";
    } else if (tempVal < 40 && tempVal > 30) {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#FF6347";
    } else {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#01cd74";
    }
  });

  //Get Last AirQuality
  lastChild_Rec.on("child_added", function(lastdatasnap) {
    var AirQualityVal = lastdatasnap.child("AirQuality").val();

    if (AirQualityVal > 40) {
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#DC143C";
    } else if (AirQualityVal < 40 && AirQualityVal > 30) {
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#FF6347";
    } else {
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#01cd74";
    }
  });

  //Get Last Light
  lastChild_Rec.on("child_added", function(lastdatasnap) {
    var tempVal = lastdatasnap.child("Light").val();

    if (tempVal > 40) {
      document.getElementById("lastLight").innerText = tempVal;
      document.getElementById("statsId_light").style.borderColor = "#DC143C";
    } else if (tempVal < 40 && tempVal > 30) {
      document.getElementById("lastLight").innerText = tempVal;
      document.getElementById("statsId_light").style.borderColor = "#FF6347";
    } else {
      document.getElementById("lastLight").innerText = tempVal;
      document.getElementById("statsId_light").style.borderColor = "#01cd74";
    }
  });
}
