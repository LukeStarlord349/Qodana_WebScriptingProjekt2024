<?php

class vote 
{
    public $id;
    public $timeslot_id;
    public $voter;

    function __construct($id, $timeslot_id, $timeslot_date, $voter)
    {
        $this->id = $id;
        $this->timeslot_id = $timeslot_id;
        $this->timeslot_date = $timeslot_date;
        $this->voter = $voter;
    }
}