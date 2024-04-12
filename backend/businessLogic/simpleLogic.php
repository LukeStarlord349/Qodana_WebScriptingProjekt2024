<?php
include("./models/appointment.php");
class requestLogic
{
	private $id;
	function __construct()
        {
            $this->dh = new DataHandler();
        }

	function handleRequest($method, $param) {
		switch ($method)
		{
			case 'getAppointList':
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
}