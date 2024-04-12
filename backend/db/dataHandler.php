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
        $sql = "SELECT * FROM appointment";
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
}
