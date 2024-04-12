$(document).ready(function() {
    // Code abhängig von DOM-Bereitschaft hier

    let timeslotsCounter = 1;

    $('#navNew').on('click', function(event) {
        event.preventDefault();
        $('#newAppointmentModal').modal('show'); // Modal für neue Termine anzeigen
    });

    $("#addNewTimeslot").on('click', function() {
        timeslotsCounter++;
        addNewTimeslot(timeslotsCounter); // `timeslotsCounter` als Argument übergeben
    });

    getAppointmentData();
});


function getAppointmentData() {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "getTestData" , param: "test"},
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            let message = "Fehler beim Laden der Daten! " + status + " " + error;
            showErrorModal(message);
        }



    })
}


// New timeslots erstellen
function addNewTimeslot(timeslotsCounter) {
    console.log("Neuen Zeitslot hinzufügen", timeslotsCounter); // Protokollierung zur Überwachung des Wertes
    $("#timeslots").append(`
    <div class="mb-3">
        <label for="timeslot${timeslotsCounter}" class="form-label">Zeitslot ${timeslotsCounter}:</label>
        <input type="datetime-local" class="form-control" id="timeslot${timeslotsCounter}" name="timeslot${timeslotsCounter}">
    </div>`);
}

// Fehlermodal
function showErrorModal(message) {
    // Erstelle ein jQuery-Objekt aus dem HTML-String
    let myModalElement = $(`
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Fehler</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
            </div>
            </div>
        </div>
    </div>`);
    // Setze den Nachrichtentext
    myModalElement.find('.modal-body p').text(message);
    // Erstelle eine Bootstrap-Modal-Instanz aus dem jQuery-Objekt
    let myModal = new bootstrap.Modal(myModalElement[0]); // Das DOM-Element aus dem jQuery-Objekt holen
    myModal.show();
    $(document.body).append(myModalElement);
}