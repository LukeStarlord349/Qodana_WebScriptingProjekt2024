$(document).ready(function() {

    // Event listener for opening the login modal
    $('#navLogin').on('click', function(event) {
        event.preventDefault(); // To prevent the href action of the link
        $('#loginModal').modal('show');
    });

    // Event listener for opening the new appointment modal
    $('#navNew').on('click', function(event) {
        event.preventDefault(); // To prevent the href action of the link
        $('#newAppointmentModal').modal('show'); 
    });
});