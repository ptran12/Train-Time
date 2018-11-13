// Initialize Firebase 

var config = {
    apiKey: "AIzaSyBzuq_hE0dqOidhdpiZpzSR-DuwKHa9T7Q",
    authDomain: "train-time-project-d3891.firebaseapp.com",
    databaseURL: "https://train-time-project-d3891.firebaseio.com",
    projectId: "train-time-project-d3891",
    storageBucket: "train-time-project-d3891.appspot.com",
    messagingSenderId: "1052127532330"
};

firebase.initializeApp(config);

var database = firebase.database();

//////////////////////////////////////////////////
//////////////////////////////////////////////////

$("#add-train-btn").on("click", function(event) {
    event.preventDefualt();

    ///USER INPUT///////

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-name-input").val().trim();
    var firstTime = $("#train-time-input").val().trim();
    var trainFrequency = $("#requency-input").val().trim();

    /////////////Object to hold train data//////////////
    var newT = {
        name: trainName,
        trainDes: destination,
        time: firstTime,
        frequency: trainFrequency
    };

    ///Upload train data to the Firebase Database/////
    database.ref().push(newT);

});