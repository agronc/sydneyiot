# Welcome to SydneyIOT | HealthSpace Project 
## URL: http://www.sydneyiot.com.au/health/

## Our Simple Goal

To utilise the forefront innovation in the IOT space by utilising simple and sofisticated rapid-prototyping development boards, with the aim to investigate solutions to indoor pollution.

## How it works? (The simple breakdown)

##### 1- AVR-IOT WG <a href="https://www.microchip.com/developmenttools/ProductDetails/AC164160">product link</a>
The board is connected to the cloud via wifi to Google Cloud. After provisioning the board, data is stored in firebase.
##### 2- Website/Dashboard
A website/dashboard is created (all code is hosted in this repo), with all code being commented. Feel free to ask any questions on how any of the components work.
##### 3- Storing Data
Once the data is in firebase-realtime database, we use the firebase methods to read the data and display it on a webpage.
##### Hosting APIs
4- At the same time, Cloud Functions(located in your Firebase dashboard) is utilies for hosting the backend code, including the Twilio API code for triggering SMS alerts.(The CloudFunction code can is located under he firecast directory).
##### SMS alerts (Twilio API)
5- For SMS alerts to work, you need to create a Twilio account (A free account will be sufficient to replicate this project. <a href="https://www.twilio.com">Twilio link</a>
##### Chatbot AI/ML
6- To setup the AI/ML chatbot, you will need to create a free account with Dialogflow <a href="https://dialogflow.com/">Dialogflow link</a>
##### IHS (Indoor Health Score)
We introuced unit for combining all the datapoints. The formula combines (temperature, light intensity and air quality) and averages them to a score out of 100.

## Reproduction Steps

## Setting up the IOT Development board

Step 1. Connect your AVR-IOT Board to your PC Via USB Cable. 
Step 2. You will be prompted by the curiosity board.
Step 3. From the readme file in curiosity, you will be taken to the web-dashboard to connect via your wifi credentials.
Step 4. After your wifi credentials are entered, the config file can be added to your curiosity drive.
Here is a visual demo on how to acieve this: [link] https://www.youtube.com/watch?v=WK4ljyKDMIQ

## Installing/adding new sensors to the board - Adding AirQuality Click Board. <a href="https://www.mikroe.com/air-quality-click">AirQuality Sensor link</a>
If you have purchased a AirQuality Click sensor (MQ-135), you can add the sensor on top of the board, or connect it via a breadboard as follows; However, it is recommended you connect it via breadboard, otherwise the airQuality sensor will block the light and temperature sensor which would compromise the data quality.

<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/AVR-IOTsetup.png?token=AQScVwljUJi-YUZQ1Vpt6qTIfEAqzNYxks5cqePlwA%3D%3D" height="400">

## Connecting the AVR-IOT to the cloud
The first step is to connect your board to the cloud. For step by step instructions, please follow this video as it goes in-depth of how to connect it. [link] https://www.youtube.com/watch?v=WK4ljyKDMIQ

At this stage, you will only see two sensor data being displayed. hat is light and temperature since the Air Quality Board has not yet been setup within the board. In order to do that, follow the easy steps below;

Step 1: Depending if your Sensor came with pinheaders soldiered in. You can follow this guide to connect the sensor with the pins and also provides a overview on the sensor itself: https://download.mikroe.com/documents/add-on-boards/click/air-quality/air-quality-click-manual-v100.pdf

Step 2: After soldiering pin headers on the airquality sensor and the board, here are the items required to make the hardware work together;
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/sydney-iot-hardware.png?token=AQScVxM5uYkwmb9pIml3fqcr7I-Hdxq3ks5cqedxwA%3D%3D" height="400">

Step 3: Go to: https://start.atmel.com/ to get started in downloading the requires software/middleware.
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/avr-iot-wg-amtel.png?token=AQScV_ZIrEz3SoMm8rBOCnnDcACaYvFXks5cqehfwA%3D%3D" height="400">

Step 4: Click on browser examples

Step 5: Search in the search bar for "AVR IoT WG Sensor Node with AirQuality Click"
The result should appear like this;
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/amtelstudio-air-quality-clickboard.png?token=AQScV9hAjSvuyrRYQlipJKXOBZZCqP0Cks5cqeknwA%3D%3D" height="400">

Step 6: After downloading the example, open the example in Atmel START

Step 7: In Atmel Studio 7 go to => File->Import->Atmel Start Project.

Step 8: now you are ready to build the project into the board and get ready to submit sensor data to the cloud.
To build the code into the board, simply click on the build button as below;
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/build-amtel-start.png?token=AQScV88l6xNuZgz0AGtDC4jc0yjrarGkks5cqeqBwA%3D%3D" height="200">

After you have successfully connected your board to the cloud and can see the sensor data, it's time to connect your board to Firebase Real time data base, so it can be used in this project.

## Firebase Realtime Database setup

Easiest method of connecting your sensor data to a firebase realtime database (currently you don't have access to the data even though you can see the charts) you can follow this guide: https://github.com/Leverege/microchip-avr-iot

## Reading data real time

To read the data from Firebase and display it on your site, you will need to download the code and replace the deviceID your device ID which can be viewed from the URL when you clicked on "readme" from the curiosity board.

However, here are critical steps to follow inorder to get the code working.

Step 1: Download or clone this repository.

Step 2: Double click on index.html, this file will open the dashboard with the charts, which will be empty to begin with (Since we haven't pointed the web page to your sensor data)

Step 3: Install your favourite IDE inorder to edit the code, Notepad will do, however visual studio code is highly recommended.

Step 4: go to index.html and replace the Firebase Config variable to your one (which can be found in the project settings of your firebase dashboard.
 ``// Initialize Firebase
  var config = {
    apiKey: "your api Key",
    authDomain: "yourProjectName.firebaseapp.com",
    databaseURL: "https://yourProjectName.firebaseio.com",
    projectId: "yourProjectID",
    storageBucket: "auto generated for you by firebase when you generate the config file",
    messagingSenderId: "sender ID, again generated by firebase itself"
  };``
  
Step 5: once you have made the changes in the config file, you are ready to connect to your firebase account to commence data read/write

## Displaying Data on a webpage/Dashboard

To display data on the web, you will need to open model.js This file hosts the javascript which is used to read the data in real time from firebase, and display it on the web-dashboard.

Firstly, once you open the file, replace all instances where a device id is referenced, and replace it with yours.

Here is an example;
``var lastChild_Rec = firebase
    .database()
    .ref("avr-iot/data/01234245A3E58A0BFK/") //replace this path with your device ID
    .limitToLast(1);``
  
 Once you have replaced all instances of the references to point to your cloud database, save all files that you made changes to and re-open the index.html file.
 
 Once the file opens, you should see that the dashboards is displaying data of your sensor in real time, and the colour of the charts should change based on the values being read. To modify these settings, you can go back to model.js and follow the instructions in the comments on what each setting performs.
 
## Setting up Cloud Functions (Firebase) for Hosting SMS/Twilio APIs
In order to setup cloud functions to send automated SMS, you will need two items.
1- A twilio SMS account which you can sign up for free and use the trial for this project: https://www.twilio.com/
2- Cloud functions, which can be found in the main menu of you Firebase dashboard.

Once you are familiar with how cloud functions work, you can create one either through the command line interface or the web. Instructions on how to access your cloud functions via console can be found here: https://cloud.google.com/functions/docs/quickstart-console

When you are ready to setup you cloud functions, open the firecast folder from this project (it is included in the downloaded project that you have previously made. All the functions code is stored within the subfolder called functions. For ease of access, here is the url that contains all the logic for the cloud functions: https://github.com/agronc/sydneyiot/blob/master/firecast/functions/index.js

Once you open the file, you will need to update the credentials for your twilio api which you have previously created.

The setings to be updated are as follows;

``const twilio = require("twilio");
const accountSid = "your account sid";
const authToken = "your auth token";``

Secondly, all instances of ``.ref("avr-iot/data/01234245A3E58A0BFE/")`` Will need updating to point to your device ID, similiar to the previous step.

Once you have made the changes, through the console (found in this guide: https://cloud.google.com/functions/docs/quickstart-console) you can push the functions to your Firebase account.

At this point, every new data created that meets the criteria from the function code, will trigger a twilio API call to send an SMS alert.

Feel free to spend sometime reading the code an comments, to familiarise yourself with different functions.

## Up and running with Dialogflow

So you are still reading this eh?
This Part can be challenging, as there are several ways to configure the chatbot AI.
However, you can follow these steps, to replicate my project.
Firstly, go to dialogflow website and signup for a free account (no need to upgrade account for this project) link: https://dialogflow.com/

Step 1: you will need to create an agent (aka chatbot).
Step 2: During setup, under Google project, select your google project that you have preveiously created, this will allow you to connect your chatbot to read the data from cloud functions and firebase.
Step 3: After creating your project, head over to the intents section. Intents can be described as actions or patterns detected by the agent based on user query. If a user asks for temperature, it will link to an intent (if its created) and reply accordingly.
Your Intent section should appear like this, once all intents have been created.
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/dialogflowS1.png?token=AQScV1YtZMyDKaBjcwOPjBb51Z64qbBoks5cqfJ4wA%3D%3D" height="400">

Please note depending on your project, these intent names can be called anything (though keep them descriptive to their function). I would also advice not including spaces in your naming as you will later use these names in the next few steps.

Step 4: Now the fun part, training your intent! If your intent is about reading temperature, add queries that you believe a user may ask. The more variants you add, the better the ML training alogrithm will perform.
Here is a quick look of how it should appear
<img src=";https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/dialogflows2.png?token=AQScV0XOxV1ix-vyKVq_LXu4Ck1QaQUgks5cqfLRwA%3D%3D" height="400">

Step 5: After you have tested your intent, make sure you have turned on fulfillment. This is critical for the next step.
Your settings should appear as follows;
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/dialogflows3.png?token=AQScVxPDeCBqJ10k0BahAdPUSxypINdXks5cqfM3wA%3D%3D" height="400">

Step 6: once you are happy with the training data, makes sure to click save, and let the training begin.

Step 7: Create any other intents that you might want to include, these could be your sensor data such as humidity or anything else that you may be recording.

Step 8: After you have created your intents, go to the fulfillment section which can be seen in the main menu.
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/dialogflows4.png?token=AQScV3ClstO1za8KiEscat7w94vaHFMMks5cqfOhwA%3D%3D" height="400">

Step 9: Since we are already using cloud functions, it would make sense to do the same for the chatbot AI.
Thus, we will use the inline cloud function editor for our purpose (which also allows us to access realtime data from Firebase).
Your Screen should now look something like this;
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/dialogflows5.png?token=AQScV6WMSdpetho8SdYDthVWwc1HbPHUks5cqfQCwA%3D%3D" height="400">

Step 10: Since you are now a cloud functions expert, we can reuse similar logic that we previously build in cloud functions. After enabling your inline editor, your screen should have some default code ready. This code is necessary, however you can delete the commented sections.
Your screenshould now appear as follows;
<img src="https://raw.githubusercontent.com/agronc/sydneyiot/master/screenshots/dialogflows6.png?token=AQScV1tUiRUgKf8f8uC9jUrPgHWXI5zXks5cqfQDwA%3D%3D" height="400">

Step 11 and onwards:

A note to keep in-mind, the inline editor cloud function within Dialogflow simply acts as an interface for the function hosted within firebase cloud functions. However, please keep in-mind as you "Deply" new code, you may lose existing versions, so it's highly recommended to keep a local copy.

The main purpose of using the cloud function for Dialogflow is to provide ease of access to our data via firebase api.

To setup firebase read/write, you will need to include the following constants within the inline editor;
``const functions = require('firebase-functions');
const admin = require("firebase-admin");
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://avr-iot-f1693.firebaseio.com/'
}); ``

After you have updated the above code, you can now start adding functions and logic for you chatbot.

Firstly, each function created will require an intent Map for triggering your functions.
The code is as follows (you can add more intent maps as you create more intents within dialogflow);
``  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('readAir', handleReadAir);
  agent.handleRequest(intentMap);
});``

In this example, we demonstrate how we read the data from firebase, when an intent is triggered by the user.
If you remember previously, we create and trained our intent to understand various questions such as "temperature status".
Once a user asks a similar question, an intent is triggered which consequently calls the function below (in our example);
``    function handleReadAir(agent) {
    return admin.database().ref('avr-iot/data/01234245A3E58A0BFE/').limitToLast(1).once('value').then((snapshot) => {
    const value = snapshot.child(Object.keys(snapshot.val())[0] + '/AirQuality').val();//this gets the latest value of AirQuality
      if (value < 350 ) { //Perform some logic on the value
      agent.add(`Your air quality value is ${value}` + ' which is within the recommended range');//reply to the user
      }
      else {
        agent.add(`Your air quality value is ${value}`);//otherwise we have a default response.
      }
    });
  }``
  
You will notice that we use ``agent.add()`` in the above function, this component returns an answer to the user based on which statement it falls under. Further, we use the data stored in the 'value' variable to provide the user with an actual value. Variables on cloud functions can be used as ``${constant/variable name}``.

The above steps will allow you to get started with the basics of using chatbots via firebase to read data from your AVR-IOT development board. 

In the very near future, we will be covering more topics and tutorials on how to setup each components in-depth. 

If you have any questions, feel free to get in touch via the weblink: www.sydneyiot.com.au/health

  
## To view the project live, please visit the following URL: sydneyiot.com.au/health






