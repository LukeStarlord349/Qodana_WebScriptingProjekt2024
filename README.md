# WebScriptingProjekt2024

## Team-Mitglieder
- Lukas Kalab (if23b238)
- Maximilian Kaltenreiner (if23b013)

## Projektbeschreibung

Im Rahmen des Web Scripting-Kurses müssen wir ein Webprojekt implementieren. Das Projekt sollte Teile der bereits eingereichten Übungen nutzen. Das Projekt wird in Teams von zwei Personen durchgeführt.

### Aufgabenanforderungen

- Alle Termine in einer Liste anzeigen (Startseite)
- Detaillierte Ansicht eines Termins anzeigen, einschließlich aller Optionen und früherer Abstimmungen (einschließlich Kommentare)
- Benutzern ermöglichen, für ein oder mehrere Termine in der detaillierten Ansicht abzustimmen
- Einen neuen Termin erstellen (z. B. Titel, Ort, Informationen, Dauer) mit einer Liste der vorgeschlagenen Termine
- Der Ersteller eines Termins hat die Möglichkeit den Termin zu löschen (evtl. via Eingabe eines Passwortes?)

### Verwendete Technologien

Das Projekt umfasst den Inhalt dieses Kurses sowie ausgewählte Themen aus dem Web Technologies-Kurs im ersten Semester:

- Frontend: HTML5, CSS3, Bootstrap
- JavaScript, jQuery, AJAX
- TypeScript
- PHP (für REST-Backend und Datenbankintegration)
- MySQLi + Prepared Statements für die Datenbankanbindung

### Benutzererfahrung

Bitte stellen Sie eine gute Benutzererfahrung in der Anwendung sicher, indem Sie weiße Seiten, Fehlerzustände vermeiden und insgesamt einen positiven Eindruck vermitteln.

### Projektstruktur

AppointmentFinder/
├─ frontend/
│  ├─ index.html
├─ css/
│  ├─ mystyle.css
├─ js/
│  ├─ myscript.js
├─ backend/
│  ├─ serviceHandler.php
├─ businesslogic/
│  ├─ simpleLogic.php
├─ db/
│  ├─ db.php
│  ├─ dataHandler.php
├─ models/
│  ├─ appointment.php

### Erste Schritte

- Datenbank einrichten: Importieren Sie die bereitgestellten SQL-Anweisungen in Ihre MySQL-Datenbank, um die benötigten Tabellen und    Demodaten zu erstellen.
- Konfigurationsdateien: Passen Sie die Zugangsdaten in der config-Datei an, um die Verbindung zur Datenbank herzustellen.
- Server starten: Starten Sie Ihren lokalen Server und öffnen Sie die index.html im Browser, um die Anwendung zu starten.

### Hauptfunktionalitäten

- Anzeige von Appointments: Alle Appointments werden auf der Startseite in einer Liste dargestellt.
- Detailansicht und Voting: Nutzer*innen können auf ein Appointment klicken, um eine Detailansicht mit Terminoptionen zu sehen und für  ihre bevorzugten Termine zu voten.
- Beim Vorting wird der Name des Users + E-Mail abgefragt und mit der Datenbank verglichen, ob diese Person schon abgestimmt hat, ansonsten wird es zu dem Termin in die Datenbank gespeichert.
- Appointment erstellen: Über einen "New Appointment"-Button können neue Appointments angelegt werden. Dabei wird man aufgefortdert seinen Usernamen + Email anzugeben.
- Appointment löschen: Bestehende Appointments können über die Schnittstelle gelöscht werden. Der Ersteller des Termins kann ein Terminator-Passwort setzen und muss dieses beim Löschen eingeben.

### Entwicklungshinweise

- Sicherheitsaspekte, insbesondere bei der Datenbankanbindung, wurden berücksichtigt. Verwenden Sie Prepared Statements, um SQL-Injection zu vermeiden.
- Die Anwendung ist für eine gute User Experience optimiert und responsive gestaltet, sodass sie auf verschiedenen Geräten nutzbar ist.

### Weiterentwicklung

- Optionale Features und Verbesserungen der Usability können für zusätzliche Punkte im Rahmen des Projekts umgesetzt werden.

### mysql_init.ini

- Hier ist ein hypothetisches Beispiel für den Inhalt einer db_settings.ini-Datei, die die Verbindungsinformationen zur Datenbank enthält:

ini
Copy code
[database]
host = localhost
username = myusername
password = mypassword
schema = mydatabase
In diesem Beispiel:

host: Der Hostname des Datenbankservers, auf dem die MySQL-Datenbank läuft. Dies könnte "localhost" sein, wenn die Datenbank auf demselben Server wie das PHP-Skript liegt.
username: Der Benutzername, der zum Verbinden mit der MySQL-Datenbank verwendet wird.
password: Das Passwort für den angegebenen Benutzer.
schema: Der Name der Datenbank, zu der eine Verbindung hergestellt werden soll.
Stellen Sie sicher, dass Sie die tatsächlichen Verbindungsinformationen entsprechend Ihrer spezifischen MySQL-Installation anpassen. Diese db_settings.ini-Datei müsste im gleichen Verzeichnis wie das PHP-Skript liegen, das die mysqli_init-Klasse verwendet. Jo