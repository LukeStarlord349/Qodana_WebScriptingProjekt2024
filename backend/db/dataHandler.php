<?php
include("models/appointment.php");
include("appointmentLogic/mysqli_init.php");

class Datahandler
{
    public static function getAppointmentData() {
        $conn = new mysqli_init();
        		if ($conn->connect_error) {
        			die("Connection failed: ".$conn->connect_error);
        		}
        $sql = "SELECT id, thema, deadline FROM appointment";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->execute();
            $result = $stmt->get_result();
            $array = [];
            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
            $stmt->close();
        } else {
            // Handle preparation error
            return "Error preparing statement: " . $conn->error;
        }
        $conn->close();
        return $array;
    }

    public static function getAppointmentDetails($appointmentId) {
        $conn = new mysqli_init();
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM appointment WHERE id = ?"; // Use a placeholder for the id
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $appointmentId); // Bind the integer parameter
            $stmt->execute();
            $result = $stmt->get_result();
            $array = [];
            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
            $stmt->close();
        } else {
            return "Error preparing statement: " . $conn->error;
        }
        $conn->close();
        return $array;
    }

    public static function getAppointmentTimeslots($appointmentId) {
        $conn = new mysqli_init();
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM timeslot WHERE appoint_id = ?"; // Use a placeholder for the id
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $appointmentId); // Bind the integer parameter
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $array = [];
                while ($row = $result->fetch_assoc()) {
                    $array[] = $row;
                }
                if (empty($array)) {
                    $array = ["message" => "No timeslots found for this appointment."];
                }
            } else {
                $array = ["error" => "Error executing statement: " . $stmt->error];
            }
            $stmt->close();
        } else {
            $array = ["error" => "Error preparing statement: " . $conn->error];
        }
        $conn->close();
        return $array;
    }

    public static function getAppointmentComments($appointmentId) {
        $conn = new mysqli_init();
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM comment WHERE appoint_id = ?"; // Use a placeholder for the id
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $appointmentId); // Bind the integer parameter
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $array = [];
                while ($row = $result->fetch_assoc()) {
                    $array[] = $row;
                }
                if (empty($array)) {
                    $array = ["message" => "No Comments found for this appointment."];
                }
            } else {
                $array = ["error" => "Error executing statement: " . $stmt->error];
            }
            $stmt->close();
        } else {
            $array = ["error" => "Error preparing statement: " . $conn->error];
        }
        $conn->close();
        return $array;
    }
}