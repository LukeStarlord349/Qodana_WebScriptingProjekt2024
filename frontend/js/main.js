$(document).ready(function() {
    let timeslotsCounter = 1;

    $('#navNew').on('click', function(event) {
        $("#newAppointmentModal").hide();
        $('#newAppointmentModal').modal('show');
        // eventListener für den close-button 
        $(".newAppointCancel").on('click', function() {
            window.location.reload();
        })
        createEventlistenerNewAppointment(timeslotsCounter);
    });

    $("#addNewTimeslot").on('click', function() {
        timeslotsCounter++;
        addNewTimeslot(timeslotsCounter);
        createEventlistenerNewAppointment(timeslotsCounter);
    });

    // Ajax call für das Anzeigen der Termine auf der Index-Seite
    getAppointmentData(timeslotsCounter);
});

// Create Eventlistener für das Erstellen eines neuen Termins
function createEventlistenerNewAppointment(timeslotsCounter) {
    $(document).off('click', '#sendAppoint').on('click', '#sendAppoint', function() {
        let appointmentData = {
            thema: $("#title").val(),
            description: $("#descr").val(),
            location: $("#location").val(),
            deadline: $("#deadline").val(),
            duration: parseInt($("#duration").val()), // Konvertiere den string in eine Zahl
            creator: $("#creator").val(),
            timeslots: []
        };
        
        // Füge die Timeslots zum appointmentData-Objekt hinzu
        for (let i = 1; i <= timeslotsCounter; i++) {
            let timeslot = $("#timeslot" + i).val();
            appointmentData.timeslots.push(timeslot);
        }

        // Überprüfen, ob alle Felder ausgefüllt sind, und ob das timeslots Array leer ist
        if (appointmentData.thema === "" || appointmentData.description === "" || appointmentData.location === "" || appointmentData.deadline === "" || appointmentData.duration === 0 || appointmentData.creator === "" || appointmentData.timeslots.length === 0) {
            let message = "Please fill in all fields and add at least one timeslot!";
            showErrorModal(message);
            return;
        }

        // Überprüfen der Deadline (darf nicht in der Vergangenheit liegen)
        if(!checkIfValidDate(appointmentData.deadline)) {
            let message = "Please enter a valid deadline!";
            showErrorModal(message);
            return;
        }

        // Überprüfen der Timeslots (darf nicht in der Vergangenheit liegen) und darf nicht nach der Deadline liegen
        for (let i = 0; i < appointmentData.timeslots.length; i++) {
            if(!checkIfValidDate(appointmentData.timeslots[i])) {
                let message = "Please enter a valid timeslot!";
                showErrorModal(message);
                return;
            }
            if(new Date(appointmentData.timeslots[i]) > new Date(appointmentData.deadline)) {
                let message = "The timeslot must be before the deadline!";
                showErrorModal(message);
                return;
            }
        }
        // Erstelle den neuen Termin
        createAppointment(appointmentData);
    });
}

// Funktion zum Erstellen eines neuen Termins
function createAppointment(appointmentData) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        data: { method: "createAppointment", param: appointmentData },
        dataType: "json",
        success: function(response) {

            $('#newAppointmentModal').modal('hide');

            // Success-Modal anzeigen
            let message = "Appointment created successfully!";
            showSuccessModal(message);
        },
        error: function(xhr, status, error) {
            let message = "Failed to create appointment: " + error;
            showErrorModal(message);
            window.location.reload();
        }
    });  
}

// Funktion zum Abrufen der Termin-Daten für die Index-Seite
function getAppointmentData() {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "getAppointmentData"},
        dataType: "json",
        success: function(response) {
            let appointments = response;

            // Wenn noch keine Appointments vorhanden sind
            if(appointments.length === 0) {
                $("#appointment-container").append("<h3>No appointments found!</h3>");
                return;
            }

            // Sortiere die Termine nach der ID absteigend (neuester Termin zuerst)
            appointments.sort(function(a, b) {
                return b.id - a.id;
            });

            for (let i = 0; i < appointments.length; i++) {
                let id = appointments[i].id;
                let title = appointments[i].thema;
                let deadline = appointments[i].deadline;
            
                // Statusüberprüfung
                let validDate = checkIfValidDate(deadline);

                // Zeige den Termin als "Active" oder "Expired" an, abhängig vom Status "validDate
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
                // Eventlistener für die Detailansicht der Termine hinzufügen
                $("#appointment" + id).on('click', function() {
                    getAppointmentDetails(id);
                });
            }
        },
        error: function(xhr, status, error) {
            let message = "Couldn't load the data! " + error;
            showErrorModal(message);
        }
    })
}

// Funktion zum Abrufen der Detailansicht eines Termins
function getAppointmentDetails(appointmentId) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        data: { method: "getAppointmentDetails", param: appointmentId },
        dataType: "json",
        success: function(response) {
            let title = response.thema;
            let description = response.descr;
            let deadline = response.deadline;
            let creator = response.creator;
            let duration = response.duration;
            let validDate = checkIfValidDate(deadline);

            // Aktualisieren der Modal-Elemente
            $('#modalTitle').text(title);
            $('#modalBody').html(`
                <p>Created by: ${creator}</p>
                <p>Description: ${description}</p>
                <p>Deadline: ${deadline}</p>
                <p>Duration: ${duration} Minutes</p>
                <p>Status: ${validDate ? "Active" : "Expired"}</p>
            `);

            // Ändere die Hintergrundfarbe, wenn das Datum ungültig ist
            if (!validDate) {
                $('#modalContent').css('background-color', 'rgba(180, 10, 10)');
            } else {
                $('#modalContent').css('background-color', ''); // Zurücksetzen auf Standard
            }

            // Zeige die Zeitslots und Kommentare an
            getAppointmentTimeslots(appointmentId, validDate);

            // Zeige das Modal an
            $('#appointmentModal').modal('show');


            // Seite neu laden, wenn das Modal geschlossen wird
            $('.btn-close, .btn-secondary').on('click', function() {
                location.reload();
            });
        },
        error: function(xhr, status, error) {
            let message = "Failed to load appointment details: " + error;
            showErrorModal(message);
            window.location.reload();
        }
    });
}

// Funktion zum Abrufen der verfügbaren Zeitslots für einen Termin
function getAppointmentTimeslots(appointmentId, validDate) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        data: { method: "getAppointmentTimeslots", param: appointmentId },
        dataType: "json",
        success: async function(response) {
            let timeslots = response;

            $("#modalBody").append("<h5>Available Timeslots</h5>");

            for(let i = 0; i < timeslots.length; i++) {
                let startTime = timeslots[i].start_time;
                let timeSlotId = timeslots[i].id;
                let voteCount = timeslots[i].vote_count;
                let timeslotCount = i + 1;
                let voterNames = "";

                if(voteCount) { // Wenn es Votes gibt, dann die Namen der Voter abrufen
                    voterNames = await getVoterNames(timeSlotId);
                }

                // Wenn das Datum abgelaufen ist, werden die Checkboxen nicht angezeigt
                if(validDate) {
                    $('#modalBody').append(`
                    <div class="timeslot-item">
                        <span title="${voterNames}">${timeslotCount}.) ${startTime} || Votes: ${voteCount} ||</span>
                        <input type="checkbox" id="check${timeSlotId}" name="timeslotCheck">
                        <label for="check${timeSlotId}">Select</label>
                    </div>
                `)
                }
                else {
                // Zeige die Timeslots an
                $('#modalBody').append(`
                    <div class="timeslot-item">
                    <span>${timeslotCount}.) ${startTime} || Votes: ${voteCount} ||</span>
                    </div>
                `);
                }
            }
            if(validDate) {
            // Inputfeld für Name und submit button für voten
            $('#modalBody').append(`
                <div class="comment-section"><br>
                    <input type="text" id="voter" class="form-control" placeholder="Your name" /><br>
                    <button type="button" class="btn btn-secondary" id="submitVote">Submit Vote</button>
                </div>
                `);
            }

            // Zeige die Kommentare an
            getAppointmentComments(appointmentId, validDate);
        
            // eventListener für den submitVote button erstellen
            $('#submitVote').on('click', function() {
                let votesData = []; // votesData array erstellen 
                let voter = $("#voter").val();

                if(voter === "") {
                    let message = "Please enter your name!";
                    showErrorModal(message);
                    return;
                }

                if($('.timeslot-item input[type="checkbox"]:checked').length === 0) {
                    let message = "Please select at least one timeslot!";
                    showErrorModal(message);
                    return;
                }

                // Das Array votesData mit den ausgewählten Timeslots füllen
                $('.timeslot-item input[type="checkbox"]:checked').each(function() {
                    var timeSlotId = $(this).attr('id').replace('check', '');
                    votesData.push({
                        timeslot_id: timeSlotId,
                        voter: voter
                    });
                });
                $("#appointmentModal").modal('hide');
                
                createVote(votesData);
            });
        },
        error: function(xhr, status, error) {
            let message = "Failed to load appointment timeslots: " + error;
            showErrorModal(message);
            window.location.reload();
        }
    });
}

// Die Namen der Voter für einen Timeslot abrufen
function getVoterNames(timeSlotId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "../backend/serviceHandler.php",
            data: { method: "getVoterNames", param: timeSlotId },
            dataType: "json",
            success: function(response) {
                let voterNames = response;
                let voterNamesString = "";
                for (let i = 0; i < voterNames.length; i++) {
                    voterNamesString += voterNames[i] + ", ";
                }
                if (voterNamesString.endsWith(", ")) { 
                    voterNamesString = voterNamesString.slice(0, -2);
                }
                console.log(voterNamesString);
                resolve(voterNamesString);
            },
            error: function(xhr, status, error) {
                let message = "Failed to load voter names: " + error;
                console.error(message);
                reject(message);
            }
        });
    });
}

// Funktion zum Abrufen der Kommentare für einen Termin
function getAppointmentComments(appointmentId) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        data: { method: "getAppointmentComments", param: appointmentId },
        dataType: "json",
        success: function(response) {
            let comments = response;

            $("#modalBody").append("<br><h5>Comments:</h5>");

            $("#modalBody").append(`
            <div class="new-comment-section">
                <input type="text" id="commenterName" class="form-control" placeholder="Your name" /><br>
                <textarea id="newCommentText" class="form-control" placeholder="Write a comment..." rows="3"></textarea><br>
                <button type="button" class="btn btn-secondary" id="submitCommentButton">Submit Comment</button><br><br>
            </div>
            `);

            for(let i = 0; i < comments.length; i++) {
                let commentId = comments[i].id;
                let author = comments[i].author;
                let content = comments[i].content;
                let commentTime = comments[i].timestamp;


                // Zeige die Kommentare an
                $('#modalBody').append(`
                    <div class="comment-item">
                        <p>${author} (${commentTime}): <br>${content}</p>
                    </div>
                `);
            }

            // Eventlistener für den submitComment button erstellen
            $('#submitCommentButton').on('click', function() {
                let author = $("#commenterName").val();
                let content = $("#newCommentText").val();

                if(author === "" || content === "") {
                    let message = "Please fill in all fields!";
                    showErrorModal(message);
                    return;
                }
                let commentData = {
                    appoint_id: appointmentId,
                    content: content,
                    author: author
                };
                createComment(commentData);
            });
        },
        error: function(xhr, status, error) {
            let message = "Failed to load appointment timeslots: " + error;
            showErrorModal(message);
            window.location.reload();
        }
    });
}

// Funktion zum Erstellen einer neuen Vote
function createVote(votesData) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        data: { method: "createVote", param: votesData },
        dataType: "json",
        success: function(response) {
            // Success-Modal anzeigen
            let message = "Vote submitted successfully!";
            showSuccessModal(message);
        },
        error: function(xhr, status, error) {
            let message = "Failed to submit vote: " + error;
            showErrorModal(message);
            window.location.reload();
        }
    });
}

// Funktion zum Erstellen eines neuen Kommentars
function createComment(commentData) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        data: { method: "createComment", param: commentData },
        dataType: "json",
        success: function(response) {
            $("#appointmentModal").modal('hide');
            // Success-Modal anzeigen
            let message = "Comment submitted successfully!";
            showSuccessModal(message);
        },
        error: function(xhr, status, error) {
            let message = "Failed to submit comment: " + error;
            showErrorModal(message);
            window.location.reload();
        }
    });
}

// New timeslots erstellen
function addNewTimeslot(timeslotsCounter) {
    $("#timeslots").append(`
    <div class="mb-3">
        <label for="timeslot${timeslotsCounter}" class="form-label">Timeslot ${timeslotsCounter}:</label>
        <input type="datetime-local" class="form-control" id="timeslot${timeslotsCounter}" name="timeslot${timeslotsCounter}">
    </div>`);
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

// Fehlermodal
function showErrorModal(message) {
    let myModalElement = $(`
        <div class="modal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content error">
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

// Successmodal
function showSuccessModal(message) {
    let myModalElement = $(`
        <div class="modal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content success">
                <div class="modal-header">
                    <h5 class="modal-title">Success</h5>
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

    myModalElement.on('hidden.bs.modal', function () {
        window.location.reload(); // Reload the page
    });

    $(document.body).append(myModalElement);
}