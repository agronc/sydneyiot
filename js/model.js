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
  var lastChild_Light = firebase
    .database()
    .ref("avr-iot/data/01230C3DB6717F1DFE/")
    .limitToLast(1);
  lastChild_Light.on("child_added", function(lastdatasnap) {
    var tempVal = lastdatasnap.child("Temp").val();
    if (tempVal > 40) {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId").style.borderColor = "#DC143C";
    } else if (tempVal < 40 && tempVal > 30) {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId").style.borderColor = "#FF6347";
    } else {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId").style.borderColor = "#01cd74";
    }
  });
}
