const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const twilio = require("twilio");
const accountSid = "AC9bf3320e497caa28348db0578bddfe6e";
const authToken = "e07cc388abe28cbbb811a8673cb7541b";

const client = new twilio(accountSid, authToken);

const twilioNumber = "+61488841170"; // your twilio phone number

//do a if statement here check latest update to see if temp>x
exports.textStatus = functions.database
  .ref("avr-iot/data/01234245A3E58A0BFE/")
  .onUpdate(event => {
    var lastChild_Rec = admin
      .database()
      .ref("avr-iot/data/01234245A3E58A0BFE/")
      .limitToLast(1);
    lastChild_Rec.on("child_added", function(lastdatasnap) {
      var tempVal = lastdatasnap.child("Temp").val();
      if (tempVal > 39) {
        return client.messages.create(textMessage);
      }
    });
    const textMessage = {
      body: `Temperature is above the recommended threshold`,
      to: "+61424335376", // Text to this number
      from: twilioNumber // From a valid Twilio number
    };

    return;
  });
//.then(message => console.log(message.sid, 'success'))
//.catch(err => console.log(err))
