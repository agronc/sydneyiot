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

## Setting up Cloud Functions (Firebase) for Hosting SMS/Twilio APIs

## Up and running with Dialogflow

## Hosting your project on a live website. Our project hosted here: sydneyiot.com.au/health

## Discussion and additional notes




