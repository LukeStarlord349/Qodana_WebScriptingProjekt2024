<?php
class appointment
{
	public $id;
	public $thema;
	public $descr;
	public $duration;
	public $deadline;
	public $location;
	public $creator;

	function __construct($id, $thema, $descr, $duration, $deadline, $location, $creator) {
        $this->id = $id;
		$this->thema = $thema;
		$this->descr = $descr;
		$this->duration = $duration;
		$this->deadline = $deadline;
		$this->location = $location;
		$this->creator = $creator;
    }
}