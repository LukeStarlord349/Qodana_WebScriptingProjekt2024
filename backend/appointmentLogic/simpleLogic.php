<?php
include("db/dataHandler.php");

class RequestLogic {
    private $dh;

    function __construct() {
        $this->dh = new DataHandler();
    }

	function handleRequest($method, $param) {
		$result = null;
		switch ($method) {
			case 'getAppointmentData':
				$result = $this->dh->getAppointmentData();
				break;
			case 'getAppointmentDetails':
				$result = $this->dh->getAppointmentDetails($param);
				break;
			case 'getAppointmentTimeslots':
				$result = $this->dh->getAppointmentTimeslots($param);
				break;
			case 'getAppointmentComments':
				$result = $this->dh->getAppointmentComments($param);
				break;
			case 'createAppointment':
				$result = $this->dh->createAppointment($param);
				break;
			case 'createVote':
				$result = $this->dh->createVote($param);
				break;
			case 'createComment':
				$result = $this->dh->createComment($param);
				break;
			default:
				$result = "Method not supported";
				break;
		}
		return $result;
	}
}