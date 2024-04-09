<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="css/myStyle.css" rel="stylesheet">
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.7.1.js"></script>
    <script type="text/javascript" src="js/myScript.js"></script>
    <title>PlanDemic</title>
</head>

<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.php">
            <div class="logofont">
                <img id="logo" src="img/logo.svg">PlanDemic
            </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link" aria-current="page" id="navHome" href="index.php">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" id="navNew" data-bs-toggle="modal" data-bs-target="#newAppointmentModal">New</a> 
                </li>
                <li class="nav-item">
                <a class="nav-link" id="navLogin" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>


    <!-- Eine Liste mit den Terminen wird via JS erstellt (Jeder Termin eine eigene Bootstrap Card)-->
    <h1>Appointments Overview</h1>

    <!-- Platzhalter Appointments -->

    <div class="card appointment">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Date:</li>
            <li class="list-group-item">Title:</li>
            <li class="list-group-item">Description:</li>
            <li class="list-group-item">Duration</li>
            <li class="list-group-item">Deadline</li>
        </ul>
    </div>
    <div class="card appointment">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Date:</li>
            <li class="list-group-item">Title:</li>
            <li class="list-group-item">Description:</li>
            <li class="list-group-item">Duration</li>
            <li class="list-group-item">Deadline</li>
        </ul>
    </div>
    <div class="card appointment">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Date:</li>
            <li class="list-group-item">Title:</li>
            <li class="list-group-item">Description:</li>
            <li class="list-group-item">Duration</li>
            <li class="list-group-item">Deadline</li>
        </ul>
    </div>



    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form id="loginForm">
            <div class="mb-3">
                <label for="loginEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="loginPassword">
            </div>
            <button type="submit" id="loginButton" class="btn btn-light">Login</button>
            </form>
        </div>
        </div>
    </div>
    </div>


    <!-- New Appointment Modal -->
    <div class="modal fade" id="newAppointmentModal" tabindex="-1" aria-labelledby="newAppointmentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="newAppointmentModalLabel">New Appointment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="new-appoint" class="popup">
                <div class="formcontent grid" id="appoint-inputs">
                    <label class="descr formleft" for="title">Title:</label><input class="popup_input formright forminput" type="text" name="title" /> <br>
                    <label class="descr formleft" for="descr">Description:</label><input class="popup_input formright forminput" type="text" name="descr" /> <br>
                    <label class="descr formleft" for="duration">Duration (in min.):</label><input class="popup_input formright forminput" type="number" name="duration" /> <br>
                    <label class="descr formleft" for="deadline">Deadline:</label><input class="popup_input formright forminput" type="datetime-local" name="deadline" /> <br>
                </div>
                <div class="formcontent grid equal">
                    <p class="formtext formfull" id="timeslot-prompt"><a id="addTimeslot">Add timeslot</a></p>
                    <button type="button" class="btn btn-light formleft" data-bs-dismiss="modal"><i class="far fa-window-close"></i>Cancel</button>
                    <button type="button" class="btn btn-light formright" id="sendAppoint"><i class="fas fa-sign-in-alt"></i>Create</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    </div>


    <!-- Footer -->
    <footer>
        <h1 id="contactHeader">Kontakt</h1>
        <p><strong>Telefonnummer: </strong> <a class="foot-link" href="tel:06601234567">0664 1234567</a><br>
        <strong>E-Mail: </strong><a class="foot-link" href="mailto:schedule@plandemic.com">schedule@plandemic.com</a></p>
        <p>© Copyright - PlanDemic</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>