function fire() {
  // Get a reference to the database service
  var database = firebase.database();

  //Store in a variable the last batch of sensor data added to Firebase
  var lastChild_Rec = firebase
    .database()
    .ref("avr-iot/data/01234245A3E58A0BFE/")
    .limitToLast(1);

  //vars for temp, last 7 days data
  var d1 = 10;
  var d2 = 10;
  var d3 = 10;
  var d4 = 10;
  var d5 = 0;
  var d6 = 0;
  var d7 = 0;
  //snapshot last 7 items.
  //Store in a variable the last batch of sensor data added to Firebase
  var last7Childs = firebase
    .database()
    .ref("avr-iot/data/01234245A3E58A0BFE/")
    .limitToLast(7);
  //var limitFirst = last7Childs.limitToFirst(1);
  //update values of vars from d1-d7

  last7Childs.on("child_added", function(snapshot) {
    d7 = snapshot.child("Temp").val();
    console.log("snapshot: ");
    //console.log("numCh: " + keysNum);
    console.log("d7: " + d7);
    d2 = 45;
  });

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
      document.getElementById("temp-rec").innerHTML = temp_rec_b;
      tempTotal = 20;
    } else if (tempVal < 27 && tempVal > 24) {
      //orange for non-optimal orange
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#FF6347";
      document.getElementById("tempSmsAlert").innerHTML =
        "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>SMS Alert Sent</strong> Temperature has reached the recommended threshold.</div>";
      tempTotal = 75;
      document.getElementById("temp-rec").innerHTML = temp_rec_p;
    } else if (tempVal < 21 && tempVal > 18) {
      //orange for non-optimal orange
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#FF6347";
      document.getElementById("tempSmsAlert").innerHTML =
        "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>SMS Alert Sent</strong> Temperature has reached the recommended threshold.</div>";
      tempTotal = 75;
      document.getElementById("temp-rec").innerHTML = temp_rec_p;
    } else if (tempVal < 20) {
      //change to blue when cold (lowerbound)
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#4787ff";
      document.getElementById("tempSmsAlert").innerHTML =
        "<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>SMS Alert Sent</strong> Temperature has reached the recommended threshold.</div>";
      tempTotal = 20;
      document.getElementById("temp-rec").innerHTML = temp_rec_c;
    } else {
      document.getElementById("lastTemp").innerText = tempVal;
      document.getElementById("statsId_temp").style.borderColor = "#01cd74";
      tempTotal = 90;
      document.getElementById("temp-rec").innerHTML = temp_rec_g;
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
      document.getElementById("air-rec").innerHTML = air_rec_b;
      airTotal = 20;
    } else if (AirQualityVal < 1000 && AirQualityVal > 350) {
      //poor air quality range
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#FF6347";
      document.getElementById("air-rec").innerHTML = air_rec_p;
      airTotal = 75;
    } else {
      //Fresh air quality range
      document.getElementById("lastAirQuality").innerText = AirQualityVal;
      document.getElementById("statsId_airquality").style.borderColor =
        "#01cd74";
      document.getElementById("air-rec").innerHTML = air_rec_g;
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
      document.getElementById("light-rec").innerHTML = light_rec_b;
    } else if (lightVal < 80) {
      //lowerbound negative range - not enough light
      document.getElementById("lastLight").innerText = lightVal;
      document.getElementById("statsId_light").style.borderColor = "#DC143C";
      document.getElementById("light-rec").innerHTML = light_rec_c;
      lightTotal = 20;
    } else if (lightVal < 160) {
      //undersired range for office/desk areas
      document.getElementById("lastLight").innerText = lightVal;
      document.getElementById("statsId_light").style.borderColor = "#FF6347";
      document.getElementById("light-rec").innerHTML = light_rec_p;
      lightTotal = 75;
    } else {
      //optimal range between 160 - 320
      document.getElementById("lastLight").innerText = lightVal;
      document.getElementById("statsId_light").style.borderColor = "#01cd74";
      document.getElementById("light-rec").innerHTML = light_rec_g;
      lightTotal = 90;
    }
    //column chart for temperature;
    var options = {
      chart: {
        type: "bar"
      },
      series: [
        {
          title: "sdsd",
          name: "Percentage score out of 100",
          data: [tempTotal, airTotal, lightTotal] //these variables are updated by firebase.
        }
      ],
      xaxis: {
        categories: [
          "Temperature Optimality",
          "Air Quality Optimality",
          "Light Optimality"
        ]
      },
      title: {
        text: "IHS individual scores out of 100",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "24px",
          color: "#263238"
        }
      }
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    function computeTotalScore() {
      //compute total score /100.
      var healthScore = Math.round((tempTotal + airTotal + lightTotal) / 3);
      document.getElementById("HealthScoreValue").innerText = healthScore;
    }
    computeTotalScore();
  });
}

//Air quality recomendations
var air_rec_b =
  '<ul class="custom-list"><li>Regulate air-conditioning for temperature and humidity consistency</li>' +
  "<li>Maintain a  0.1 and 0.2 metres per second of air-flow for optimal air circulation</li>" +
  "<li>Reduce temperature fluctuations to mitigate loss of productivity</li>" +
  "<li>Add additional air purification devices in high-density locations (staff to space ratio)</li></ul>";
var air_rec_p =
  '<ul class="custom-list"><li>Maintain a  0.1 and 0.2 metres per second of air-flow for optimal air circulation</li>' +
  "<li>Regulate air-conditioning for temperature and humidity consistency</li>" +
  "<li>Reduce temperature fluctuations to mitigate loss of productivity</li>" +
  "<li>Install deflectors on air vents to direct airflow away from people.</li></ul>";
var air_rec_g =
  '<ul class="custom-list"><li>Regulate air-conditioning for temperature and humidity consistency</li>' +
  "<li>Reduce temperature fluctuations to mitigate loss of productivity</li>" +
  "<li>Ensuring a adequate and constant air-flow can prevent feeling 'stuffiness'</li>" +
  "<li>Maintain a  0.1 and 0.2 metres per second of air-flow for optimal air circulation</li></ul>";

//Temperaure recommendations
var temp_rec_b =
  '<ul class="custom-list"><li>Your current temperature is outside of the optimal range (21C - 23C), immediate action is highly recommended.</li>' +
  "<li>Your current temperature range may hinder staff performance by 20%</li>" +
  "<li>Maintain a constant temperature close to 21C - 23C for optimal conditions</li>" +
  "<li>Aim for a constant non-fluctuating temperature range throughout the day</li>" +
  "<li>Utilise the auto-SMS alert feature provided by HealthSpace to receive notifications of poor temperature levels</li></ul>";
var temp_rec_p =
  '<ul class="custom-list"><li>We recommend adjusting the temperature range towards the optimal range (21C - 23C)</li>' +
  "<li>Your current temperature range can lead to staff discomfort if continued</li>" +
  "<li>Reduce temperature fluctuations to mitigate loss of productivity</li>" +
  "<li>Aim for a constant non-fluctuating temperature range throughout the day</li></ul>";
var temp_rec_c =
  '<ul class="custom-list"><li>Your staff must be freezing! Temperature under 20C are linked significant reduction in staff performance and discomfort.</li>' +
  "<li>Reduce temperature fluctuations to mitigate loss of productivity</li>" +
  "<li>We recommend adjusting the temperature range towards the optimal range (21C - 23C)</li>" +
  "<li>Maintain a  0.1 and 0.2 metres per second of air-flow for optimal air circulation</li></ul>";
var temp_rec_g =
  '<ul class="custom-list"><li>Keep it up! Your current temperature range falls under the optimal recommended guidelines (21C - 23C)</li>' +
  "<li>Maintain a constant temperature by eliminating potential fluctuations</li>" +
  "<li>Consider other optimisations; including air quality and light intensity to improve your IHS</li>" +
  "<li>Utilise the SMS alert feature to be notified when your temperature enter non-optimal ranges</li></ul>";

//Light intensity recommendations
//too much light
var light_rec_b =
  '<ul class="custom-list"><li>Light intensity is too high - Consider switching to controllable LED lightning.</li>' +
  "<li>Consider adding light filters - to reduce intensity</li>" +
  "<li>Switch to smart lights as a quality and cost saviving measure</li>" +
  "<li>Replace existing light units where flickering is present</li>" +
  "<li>Utilise the auto-SMS alert feature provided by HealthSpace to receive notifications of poor light intensity levels</li></ul>";
//non optimal range
var light_rec_p =
  '<ul class="custom-list"><li>Switch to smart lights as a quality and cost saviving measure</li>' +
  "<li>Replace existing light units where flickering is present</li>" +
  "<li>Reduce shadow spots near working areas. Inconsistencies in light intensity can cause staff drowsiness</li>" +
  "<li>Utilise the auto-SMS alert feature provided by HealthSpace to receive notifications of poor light intensity levels</li></ul>";
//not enough light
var light_rec_c =
  '<ul class="custom-list"><li>Light intensity is too low - Consider upgrading to controllable LEDs for optimal light coverage</li>' +
  "<li>With smart LED lighting you can control and adjust the light spectrum</li>" +
  "<li>Reduce shadow spots near working areas. Inconsistencies in light intensity can cause staff drowsiness</li>" +
  "<li>Utilise the auto-SMS alert feature provided by HealthSpace to receive notifications of poor light intensity levels</li></ul>";
//good/acceptable range
var light_rec_g =
  '<ul class="custom-list"><li>Great work! It appears that your light intensity is within acceptable ranges</li>' +
  "<li>Remember to account for other factors including the reduction of light reflections</li>" +
  "<li>Consider other optimisations; including air quality and light intensity to improve your IHS</li>" +
  "<li>Utilise the auto-SMS alert feature provided by HealthSpace to receive notifications of poor light intensity levels</li></ul>";
