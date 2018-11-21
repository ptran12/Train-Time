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
database.ref().on("child_added", function(tView){

    //Stores everything into a variable 
    var trainName = tView.val().name;
    var destination = tView.val().trainDes;
    var firstTime = tView.val().time;
    var trainFrequency = tView.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(trainFrequency);

    var trainR = moment().diff(moment.unix(firstTime),"minutes")%trainFrequency;
    var minutes = trainFrequency - trainR;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    // console.log(trainR);
    // console.log(minutes);
    // console.log(arrival);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTime),
        $("<td>").text(arrival),
        $("<td>").text(minutes)
      );
    
      $("#train-table > tbody").append(newRow);
    
})