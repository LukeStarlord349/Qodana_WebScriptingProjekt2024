$(document).ready(function() {

    // Event listener for opening the login modal
    $('#navLogin').on('click', function(event) {
        event.preventDefault(); // Prevent the default action of the link
        $('#loginModal').modal('show'); // Show the login modal
    });

    // Event listener for opening the new appointment modal
    $('#navNew').on('click', function(event) {
        event.preventDefault(); // Prevent the default action of the link
        $('#newAppointmentModal').modal('show'); // Show the new appointment modal
    });
});