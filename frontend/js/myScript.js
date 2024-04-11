// Define utility functions here
function addNewTimeslot(timeslotsCounter) {
    console.log("Adding new timeslot", timeslotsCounter); // Logging to monitor the value
    $("#timeslots").append(`
    <div class="mb-3">
        <label for="timeslot${timeslotsCounter}" class="form-label">Timeslot ${timeslotsCounter}:</label>
        <input type="datetime-local" class="form-control" id="timeslot${timeslotsCounter}" name="timeslot${timeslotsCounter}">
    </div>`);
}

$(document).ready(function() {
    // DOM ready-dependent code here

    let timeslotsCounter = 1;

    // Event listeners for UI elements
    $('#navLogin').on('click', function(event) {
        event.preventDefault();
        $('#loginModal').modal('show');
    });

    $('#navNew').on('click', function(event) {
        event.preventDefault();
        $('#newAppointmentModal').modal('show');
    });

    $("#addNewTimeslot").on('click', function() {
        timeslotsCounter++;
        addNewTimeslot(timeslotsCounter); // Pass `timeslotsCounter` as an argument
    });
});
