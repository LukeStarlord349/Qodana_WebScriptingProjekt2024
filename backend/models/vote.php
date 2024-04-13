<?php

class votecount
{
    public $id;
    public $timeslot_id;
    public $voter;

    function __construct($id, $timeslot_id, $voter)
    {
        $this->id = $id;
        $this->timeslot_id = $timeslot_id;
        $this->voter = $voter;
    }
}