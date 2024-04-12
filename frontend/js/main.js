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

            let appointments = response;

            for (let i = 0; i < appointments.length; i++) {
                let id = appointments[i].id;
                let title = appointments[i].thema;
                let creator = appointments[i].creator;
                let description = appointments[i].descr;
                let duration = appointments[i].duration;
                let location = appointments[i].location;
                let deadline = appointments[i].deadline;
            
                console.log(deadline);

                validDate = checkIfValidDate(deadline);

                if (validDate) {
                    let status = "Active";
                    let appointmentItem = $(` 
                    <div id="appointment${id}">
                        <div class="card text-center appointment-card appointment-active">
                            <div class="card-header appointment-header">
                                <h2 class="appointment-title">${title}</h2>
                            </div>
                            <div class="card-body appointment-card-body">
                                <h5 class="card-title appointment-card-title">Status: ${status}</h5>
                                <h5 class="card-title appointment-card-title">Open until: ${deadline}</h5>
                            </div>
                        </div>
                    </div>
                    `);
                    $("#appointment-container").append(appointmentItem);                
                }
                else 
                {
                    let status = "Expired";
                    let appointmentItem = $(`
                    <div id="appointment${id}">
                        <div class="card text-center appointment-card appointment-inactive">
                            <div class="card-header">
                                <h2 class="appointment-title">${title}</h2>
                            </div>
                            <div class="card-body appointment-card-body">
                                <h5 class="card-title appointment-card-title">Status: ${status}</h5>
                                <h5 class="card-title appointment-card-title">Closed since: ${deadline}</h5>
                            </div>
                        </div>
                    </div>
                    `);
                    $("#appointment-container").append(appointmentItem); 
                }
            }
        },
        error: function(xhr, status, error) {
            let message = "Couldn't load the data! " + error;
            showErrorModal(message);
        }
    })
}

// Überprüfen, ob der Termin noch aktiv oder schon abgelaufen ist
function checkIfValidDate (deadline) {
    const deadlineDate = new Date(deadline); // Konvertiert den string in ein Date object
    const currentDate = new Date(); // Das aktuelle Datum

    // Überprüfung, ob das Datum in der Vergangenheit liegt
    if (deadlineDate < currentDate) {
        return false;
    } else {
        return true; 
    }
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
                <h5 class="modal-title">Error</h5>
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