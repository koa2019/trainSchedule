// declare configures for Firebase
var config = {
    apiKey: "AIzaSyCs3K5zwuOuS0odq89IpPLC7HnXTOcDqgI",
    authDomain: "recent-user-with-all-use-e8e76.firebaseapp.com",
    databaseURL: "https://recent-user-with-all-use-e8e76.firebaseio.com",
    projectId: "recent-user-with-all-use-e8e76",
    storageBucket: ""
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
    var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainRate = $("#rate-input").val().trim();

    // local object to holde train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        rate: trainRate
    };

    // stores train data to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    // clear text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

// Firebase eventListner for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;

    // check new added train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainRate);

    // reformat train start time for visual reasons
    var newTrainStart = moment.unix(trainStart).format("MM/DD/YYYY");

    // find the minutes left until next train arrives
    var trainMiutes = moment().diff(moment(trainStart, "X"), "minutes");
    console.log(trainMiutes);

    // Create new row with add train info
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainRate),
        $("<td>").text(newTrainStart),
        $("<td>").text(trainMiutes),
    );

    // // Append the new row to the table
    // $("#train-table > tbody").append(newRow);
    //alt way to write above code
    $("table tbody").append(newRow);

});