//////Initialize Firebase//////////
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
    event.preventDefault();
    ///USER INPUT///////
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#train-time-input").val().trim(), "HH:mm").subtract(10, "years").format("x"); ///moment JS 
    var trainFrequency = $("#frequency-input").val().trim();

    ///////////Object to hold train data//////////////
    var newT = {
        name: trainName,
        trainDes: destination,
        time: firstTime,
        frequency: trainFrequency
    };

    console.log(newT.name);
    console.log(newT.trainDes);
    console.log(newT.time);
    console.log(newT.frequency);

    ///Upload train data to the Firebase Database/////
    database.ref().push(newT);

    alert("New Train Time Added!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

});

///COLLECTING DATA FROM FIREBASE/////
database.ref().on("child_added", function(snapshot){

    //Stores everything into a variable 
    var trainName = snapshot.val().name;
    var destination = snapshot.val().trainDes;
    var firstTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(trainFrequency);

})