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
            case 'getTestData':  // Updated to match the AJAX request
                $result = $this->dh->getAppointmentData();
                break;
            default:
                // It's good practice to handle unexpected method values
                $result = "Method not supported";
                break;
        }
        return $result;
    }
}


/* <?php
include("./models/appointment.php");
class RequestLogic
{
	private $dh;
	function __construct()
        {
            $this->dh = new DataHandler();
        }

	function handleRequest($method, $param) {
		switch ($method)
		{
		    case 'test':
		        $result = $this->dh->getTestList();
                break;
			/*case 'getAppointList':
				$result = appoint::getList($param ? $param['limit'] : NULL);
				break;
			case 'newAppoint':
				if (!isset($_SESSION['user_id']))
					$result = null;

				$result = appoint::newAppoint($param['timeslots'], $param['title'], $param['descr'], $param['duration'], $param['deadline'], $_SESSION['user_id']);
				break;
			case 'delAppoint':
				if (!isset($_SESSION['user_id']))
					$result = null;

				$result = appoint::delAppoint($param['id'], $_SESSION['user_id']);
				break;
			case 'vote':

				break;
			case 'getName':
				$result = user::getName($param['id']);
				break;
			case 'newComment':
				if (!isset($_SESSION['user_id'])) {
					$result = null;
					break;
				}

				$result = appoint::newComment($param['content'], $param['appoint_id'], $_SESSION['user_id']);
				break;
			default:
				$result = null;
		}

		return $result;
	}
} */