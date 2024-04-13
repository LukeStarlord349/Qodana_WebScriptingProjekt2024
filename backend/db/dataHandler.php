<?php
include("models/appointment.php");
include("models/timeslot.php");
include("models/comment.php");
include("appointmentLogic/mysqli_init.php");

class Datahandler
{
    public static function getAppointmentData() {
        $conn = new mysqli_init();
        if ($conn->connect_error) {
            die("Connection failed: ".$conn->connect_error);
        }
        $sql = "SELECT * FROM appointment"; // Alle appointments
        $appointments = [];
        if ($stmt = $conn->prepare($sql)) {
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                $appointments[] = new appointment(
                    $row['id'],
                    $row['thema'],
                    $row['descr'],
                    $row['duration'],
                    $row['deadline'],
                    $row['location'],
                    $row['creator']
                );
            }
            $stmt->close();
        }
        $conn->close();
        return $appointments;
    }

    public static function getAppointmentDetails($appointmentId) {
        $conn = new mysqli_init();
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM appointment WHERE id = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $appointmentId);
            $stmt->execute();
            $result = $stmt->get_result();
            $appointment = null;  // Initialize as null to handle cases where no data is found
            if ($row = $result->fetch_assoc()) {
                $appointment = new appointment(
                    $row['id'],
                    $row['thema'],
                    $row['descr'],
                    $row['duration'],
                    $row['deadline'],
                    $row['location'],
                    $row['creator']
                );
            }
            $stmt->close();
        } else {
            return "Error preparing statement: " . $conn->error;
        }
        $conn->close();
        return $appointment;  // Return either an appointment object or null
    }

    public static function getAppointmentTimeslots($appointmentId) {
        $conn = new mysqli_init();
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT t.id, t.appoint_id, t.start_time, COUNT(v.id) AS vote_count 
                FROM timeslot t 
                LEFT JOIN vote v ON t.id = v.timeslot_id 
                WHERE t.appoint_id = ? 
                GROUP BY t.id";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $appointmentId);
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $timeslots = [];
                while ($row = $result->fetch_assoc()) {
                    $timeslot = new timeslot(
                        $row['id'],
                        $row['appoint_id'],
                        $row['start_time'],
                        $row['vote_count']  
                    );
                    $timeslots[] = $timeslot;
                }
                $stmt->close();
            } else {
                $timeslots = ["error" => "Error executing statement: " . $stmt->error];
            }
        } else {
            $timeslots = ["error" => "Error preparing statement: " . $conn->error];
        }
        $conn->close();
        return $timeslots;
    }

    public static function getAppointmentComments($appointmentId) {
        $conn = new mysqli_init();
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM comment WHERE appoint_id = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $appointmentId); // Bind the integer parameter
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $comments = [];  // Use an array to store comment objects
                while ($row = $result->fetch_assoc()) {
                    $comment = new comment(
                        $row['id'],
                        $row['appoint_id'],
                        $row['timestamp'],
                        $row['content'],
                        $row['author']
                    );
                    $comments[] = $comment;
                }
                if (empty($comments)) {
                    $comments = ["message" => "No Comments found for this appointment."];
                }
                $stmt->close();
            } else {
                $comments = ["error" => "Error executing statement: " . $stmt->error];
            }
        } else {
            $comments = ["error" => "Error preparing statement: " . $conn->error];
        }
        $conn->close();
        return $comments;
    }
}