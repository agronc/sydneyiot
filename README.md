# Welcome to SydneyIOT | HealthSpace Project

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

## Installing/adding new sensors to the board - Adding AirQuality Click Board. <a href="https://www.mikroe.com/air-quality-click">AirQuality Sensor link</a>

##(Optional) Discussion on Hardware inetgration methods

## Connecting the AVR-IOT to the cloud

## Firebase Realtime Database setup

## Reading data real time

## Displaying Data on a webpage/Dashboard

## Setting up Cloud Functions (Firebase) for Hosting SMS/Twilio APIs

## Up and running with Dialogflow

## Hosting your project on a live website. Our project hosted here: sydneyiot.com.au/health

## Discussion and additional notes




