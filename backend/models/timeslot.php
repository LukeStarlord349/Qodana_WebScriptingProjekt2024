<?php

class timeslot 
{
    public $id;
    public $appoint_id;
    public $start_time;

    function __construct($id, $appoint_id, $start_time)
    {
        $this->id = $id;
        $this->appoint_id = $appoint_id;
        $this->start_time = $start_time;
    }
}