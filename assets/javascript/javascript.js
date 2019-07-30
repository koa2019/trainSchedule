$(document).ready(function() {
    // declare configures for Firebase
    var config = {
        apiKey: "AIzaSyCvq2B_s7VI-Y2pTanD5tvWlQyieHrE27Q",
        authDomain: "uclax-fullstack-class.firebaseapp.com",
        databaseURL: "https://uclax-fullstack-class.firebaseio.com",
        projectId: "uclax-fullstack-class",
        storageBucket: "",
        messagingSenderId: "854561901707",
        appId: "1:854561901707:web:9807f4c7736ddde1"
    };

    // initialize Firebase
    firebase.initializeApp(config);

    //create new variable reference for database
    var database = firebase.database();
    // eventListener for adding trains

    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        // captures user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainStart = moment($("#start-input").val(), "hh:mm").format();
        var trainFreq = $("#freq-input").val().trim();

        // local object to hold train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            start: trainStart,
            rate: trainFreq
        };
        console.log(newTrain)

        // push new train data to database
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.rate);

        // // clear text-boxes
        // $("#train-name-input").val("");
        // $("#destination-input").val("");
        // $("#start-input").val("");
        // $("#freq-input").val("");
    });

    // // Firebase eventListner for adding train to the database and a row in the html when a user adds an entry
    // database.ref().on("child_added", function(childSnapshot) {
    //     console.log(childSnapshot.val());
    //     console.log(childSnapshot.val().name);

    //     // Store everything into a variable.
    //     var trainName = childSnapshot.val().name;
    //     var trainDestination = childSnapshot.val().destination;
    //     var trainStart = childSnapshot.val().start;
    //     var trainFreq = childSnapshot.val().rate;

    //     // check new added train info
    //     console.log(trainName);
    //     console.log(trainDestination);
    //     console.log(trainStart);
    //     console.log(trainFreq);

    //     // // reformat train start time 
    //     // var newTrainStart = moment.unix(trainStart).format("hh:mm");

    //     // // find the minutes left until next train arrives
    //     // var trainMiutesAway = moment().diff(moment(trainStart, "X"), "minutes");
    //     // console.log(trainMiutesAway);

    //     // First Time (pushed back 1 year to make sure it comes before current time)
    //     var trainStartConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    //     console.log(trainStartConverted);

    //     // Current Time
    //     var currentTime = moment();
    //     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //     // Difference between the times
    //     var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    //     console.log("DIFFERENCE IN TIME: " + diffTime);

    //     // Time apart (remainder)
    //     var tRemainder = diffTime % trainFreq;
    //     console.log(tRemainder);

    //     // Minute Until Train
    //     var trainMiutesAway = trainFreq - tRemainder;
    //     console.log("MINUTES Away: " + trainMiutesAway);

    //     // Next Train
    //     var nextTrain = moment().add(trainMiutesAway, "minutes");
    //     console.log("Next Train: " + moment(nextTrain).format("hh:mm"));


    //     // Create new row with add train info
    //     var newRow = $("<tr>").append(
    //         $("<td>").text(trainName),
    //         $("<td>").text(trainDestination),
    //         $("<td>").text(trainFreq),
    //         $("<td>").text(nextTrain),
    //         $("<td>").text(trainMiutesAway),
    //     );

    //     // // Append the new row to the table
    //     // $("#train-table > tbody").append(newRow);

    //     //alt way to append data to a table
    //     $("table tbody").append(newRow);

    // });
});